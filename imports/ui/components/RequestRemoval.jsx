import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Col, Form, FormGroup, Row, } from 'reactstrap';
import update from 'immutability-helper';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';


import { Businesses } from '/imports/api/businesses/businesses';
import InputField from '/imports/ui/components/InputField';

/**
* A component embedded inline to all Businesses. Allows users to request the removal of a selected
 * business.
*/
class RequestRemoval extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      /* latest form validation errors */
      errors: { },
      
      /* latest form fields */
      submission: _.omit(this.props.existing[0], ['_id']),
    };
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  
  render() {
    return (
      <div className="bg-white px-4 py-3 border-top border-right border-bottom">
        { this.renderForm() }
        <div>
          <Button color="primary" onClick={ this.handleSubmit.bind(this) }>Request Removal</Button>
          <Button outline color="secondary" onClick={ this.props.done } className="ml-2">Cancel</Button>
        </div>
      </div>
    );
  }
  
  renderForm() {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <FormGroup tag="fieldset">
          <legend className="h5"><span className="text-primary">Requesting Removal </span>of { this.state.submission.name }<hr /></legend>
          <InputField
            handle={ this.handleInput } error={ this.state.errors.gradName }
            name="gradName" type="text" placeholder="John Doe" required />
          <InputField
            handle={ this.handleInput } error={ this.state.errors.gradEmail }
            name="gradEmail" type="email" placeholder="john@doe.org" />
          <InputField
            handle={ this.handleInput } error={ this.state.errors.gradPhone }
            name="gradPhone" type="tel" placeholder="(123) 456-7890" />
          <InputField
            handle={ this.handleInput } error={ this.state.errors.gradYear }
            name="gradYear" type="text" placeholder="2006" required />
        </FormGroup>
        <FormGroup tag="fieldset">
          <InputField
            handle={ this.handleInput } error={ this.state.errors['reason'] }
            name="reason" type="textarea" value="Reason for requesting removal" placeholder={"Why should this business be removed from our directory?"} required />
        </FormGroup>
      </Form>
    );
  }
  
  /**
   * Updates this.state to reflect a new change to a form field.
   * Handles checkboxes, all text-based input fields, textareas.
   *
   * Just add `onChange={ this.handleInput }` to the input field markup.
   *
   * @param e The generic form field to interpret.
   */
  handleInput(e) {
    let name = e.target.name;
    let value;

    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;

      case 'email':
      case 'select-one':
      case 'tel':
      case 'text':
      case 'textarea':
        value = e.target.value;
        break;

      default:
        console.log(e.target.type);
        break;
    }


    let newState = update(this.state, {
      submission: {
        [name.substring(name.indexOf('.') + 1)]: { $set: value }
      }
    });


    console.log(`handleInput: { ${name} => ${value} }`);
    this.setState(newState);
  }
  
  /**
   * Attempts to validate the form input fields found in the current state against the Business schema.
   * If successful, the Business will be updated.
   *
   * @param e The Submit button target.
   */
  handleSubmit(e) {
    e.preventDefault();

    const request = {
      gradName: this.state.submission.gradName,
      gradEmail: this.state.submission.gradEmail,
      gradPhone: this.state.submission.gradPhone,
      gradYear: this.state.submission.gradYear,
      reason: this.state.submission.reason,
      businessId: this.props.existing[0]._id,
      business: {
        name: this.state.submission.name,
        description: this.state.submission.description,
        category: this.state.submission.category,
        photo: this.state.submission.photo,
        phoneNumber: this.state.submission.phoneNumber,
        website: this.state.submission.wesbite,
        country: this.state.submission.country,
        streetAddress: this.state.submission.streetAddress,
        city: this.state.submission.city,
        state: this.state.submission.state,
        zip: this.state.submission.zip,
      }
    }

    // convert strings to numbers
    request.gradYear = parseInt(request.gradYear);
    
    // attempt to validate newest submission
    Meteor.call('removalRequest.validate', request, (err, res) => {
      // if there were validation errors, update error state to reflect
      if (res) {
        const errors = res.reduce((list, e) => {
          list[e.name] = e.message;
          return list;
        }, {});
        
        this.setState({ errors: errors });
      } else {
        if (request.business.phoneNumber) request.business.phoneNumber = request.business.phoneNumber.replace(/\D/g,'');
        if (request.gradPhone) request.gradPhone = request.gradPhone.replace(/\D/g,'');

        console.log(request);
        Meteor.call('removalRequests.insert', request, (err) => {
          if (err) throw err;

          this.props.done(); // close editor indicating success
        });
      }
    });
  }

  /**
   * Update the state of the component without inadvertently altering any of the other fields also in the state.
   *
   * @param name  The name of the field to update.
   * @param value The new value for this field.
   * @returns {*} The updated copy of this.state, which is satisfactory for this.setState().
   */
  updateState(name, value) {
    let newState;

    // handle fields that are part of an object inside submission (namely, inside Business)
    if (name.includes('.')) {
      name = name.split('.');

      newState = update(this.state, {
        submission: {
          // e.g. business.description --> submission: { business: { description: (value) } }
          [name[0]]: {
            [name[1]]: { $set: value }
          }
        }
      });
    } else {
      // otherwise, our job is a little easier
      newState = update(this.state, {
        submission: {
          [name]: { $set: value }
        }
      });
    }

    return newState;
  }
  
}

export default withTracker((props) => {
  Meteor.subscribe('businesses.public');
  Meteor.subscribe('removalRequests');
  
  return {
    existing: Businesses.find({ _id: props.id }).fetch(),
    currentUser: Meteor.user(),
  };
})(RequestRemoval);
