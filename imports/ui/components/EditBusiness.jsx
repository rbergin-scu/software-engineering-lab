import update from 'immutability-helper';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Button, Col, Form, FormGroup, Row, } from 'reactstrap';


import { Businesses, Categories, USStates } from '/imports/api/businesses/businesses';
import EditRequests from '/imports/api/editRequests/editRequests';
import InputField from '/imports/ui/components/InputField';
import Photos from '/imports/api/photos/photos';

/**
 * A component embedded inline to all Businesses when viewed by administrators. Allows privileged users to directly
 * edit fields in a Business entry conveniently.
 */
class EditBusiness extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      /* latest form validation errors */
      errors: { },
      
      /* latest form fields */
      submission: _.omit(this.props.existing[0], ['_id']), // omit Mongo _id field from submission (confuses validator)
    };
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  
  render() {
    return (
      <div className="bg-white px-4 py-3 border-top border-right border-bottom">
        { Meteor.user() ? this.renderAdminForm() : this.renderForm() }
        <div>
          <Button color="primary" onClick={ this.handleSubmit }>Update Business</Button>
          <Button outline color="secondary" onClick={ this.props.done } className="ml-2">Cancel</Button>
        </div>
      </div>
    );
  }
  
  renderForm() {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <FormGroup tag="fieldset">
          <legend className="h5"><span className="text-primary">Editing </span>{ this.state.submission.name }<hr /></legend>
          <InputField
            handle={ this.handleInput } error={ this.state.errors['name'] }
            name="business.name" type="text" value={ this.state.submission.name } required />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['description'] }
            name="business.description" type="textarea" value={ this.state.submission.description } required />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['category'] }
            name="business.category" type="select"
            value={ this.state.submission.category } options={ Categories } required />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['photo'] }
            name="business.photo" type="file" />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['phoneNumber'] }
            name="business.phoneNumber" type="tel" value={ this.state.submission.phoneNumber } />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['website'] }
            name="business.website" type="text" value={ this.state.submission.website } />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['streetAddress'] }
            name="business.streetAddress" type="text" value={ this.state.submission.streetAddress } />
          <Row>
            <Col md={4} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['city'] }
                name="business.city" type="text" value={ this.state.submission.city } isColumn={ true } />
            </Col>
            <Col md={4} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['state'] }
                name="business.state" type="select" value={ this.state.submission.state } options={ USStates }
                isColumn={ true } />
            </Col>
            <Col md={4} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['zip'] }
                name="business.zip" type="text" value={ this.state.submission.zip } isColumn={ true } />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend className="h5">A Little About You <hr /></legend>
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
      </Form>
    );
  }

  renderAdminForm() {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <FormGroup tag="fieldset">
          <legend className="h5"><span className="text-primary">Editing </span>{ this.state.submission.name }<hr /></legend>
          <InputField
            handle={ this.handleInput } error={ this.state.errors['reason'] }
            name="reason" type="text" value={ this.state.submission.name } required />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['description'] }
            name="business.description" type="textarea" value={ this.state.submission.description } required />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['category'] }
            name="business.category" type="select"
            value={ this.state.submission.category } options={ Categories } required />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['photo'] }
            name="business.photo" type="file" />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['phoneNumber'] }
            name="business.phoneNumber" type="tel" value={ this.state.submission.phoneNumber } />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['website'] }
            name="business.website" type="text" value={ this.state.submission.website } />
          <InputField
            handle={ this.handleInput } error={ this.state.errors['streetAddress'] }
            name="business.streetAddress" type="text" value={ this.state.submission.streetAddress } />
          <Row>
            <Col md={4} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['city'] }
                name="business.city" type="text" value={ this.state.submission.city } isColumn={ true } />
            </Col>
            <Col md={4} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['state'] }
                name="business.state" type="select" value={ this.state.submission.state }
                options={ USStates } isColumn={ true } />
            </Col>
            <Col md={4} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['zip'] }
                name="business.zip" type="text" value={ this.state.submission.zip } isColumn={ true } />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
  
  /**
   * Updates this.state to reflect instantaneous changes to input fields. Bound by `onChange={ this.handleInput }`.
   *
   * @param e The generic form field to interpret, which can be any standard `<input type="" />`.
   */
  handleInput(e) {
    let newState;

    let name = e.target.name;
    let value;
    
    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      
      /* standard text inputs */
      case 'email':
      case 'select-one':
      case 'tel':
      case 'text':
      case 'textarea':
        value = e.target.value;
        break;

      case 'file':
        value = e.target.files[0];
        
        let upload = Photos.insert({
          file: value,
          streams: 'dynamic',
          chunkSize: 'dynamic',
        }, false);

        let ref = this; /* pointer back to _this_ so we can setState within anonymous function */
        upload.on('uploaded', (err, file) => {
          if (err) throw err;

          // uploads file and returns _result_ with the link
          Meteor.call('files.photos.find', file._id, (err, result) => {
            if (err) throw err;

            ref.setState(ref.updateState(name, result));
          });
        });

        upload.start();
        break;

      default:
        console.log('handleInput: surprising input type => ' + e.target.type);
        break;
    }

    console.log(`handleInput: { ${name} => ${value} }`);
    this.setState(this.updateState(name, value));
  }
  
  /**
   * Attempts to validate the form input fields found in the current state against the Business schema. Since this view
   * is restricted to privileged users, they will be able to directly update the Business, assuming no validation
   * errors.
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
      businessId: this.props.existing[0]._id,
      business: {
        name: this.state.submission.name,
        description: this.state.submission.description,
        category: this.state.submission.category,
        photo: this.state.submission.photo,
        phoneNumber: this.state.submission.phoneNumber,
        website: this.state.submission.website,
        country: this.state.submission.country,
        streetAddress: this.state.submission.streetAddress,
        city: this.state.submission.city,
        state: this.state.submission.state,
        zip: this.state.submission.zip,
      }
    }
    console.log(request);

    // convert strings to numbers
    request.gradYear = parseInt(request.gradYear);
    
    // attempt to validate newest submission
    Meteor.call('businesses.validate', request.business, (err, res) => {
      // if there were validation errors, update error state to reflect
      if (res) {
        const errors = res.reduce((list, e) => {
          list[e.name] = e.message;
          return list;
        }, {});
        
        this.setState({ errors: errors });
      } else {
        // otherwise, submit change to database
        // normalize phone #
        if (request.business.phoneNumber) request.business.phoneNumber = request.business.phoneNumber.replace(/\D/g,'');
        if (request.gradPhone) request.gradPhone = request.gradPhone.replace(/\D/g,'');

        if(Meteor.user()) {
          // normalize phone #
          Meteor.call('businesses.update', this.props.existing[0]._id, request.business, (err, res) => {
            if (err) throw err;

            this.props.done(); // close editor indicating success
          });
        } else {
          Meteor.call('editRequests.insert', request, (err, res) => {
            if (err) throw err;

            this.props.done(); // close editor indicating success
          });
        }
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

    // slightly modified compared to NewBusiness, because we are altering only Business, not a surrounding Submission
    name = name.split('.')[1];
    newState = update(this.state, {
      submission: {
        [name]: { $set: value }
      }
    });

    return newState;
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
  Meteor.subscribe('businesses.all');
  Meteor.subscribe('editRequests');
  
  return {
    existing: Businesses.find({ _id: props.id }).fetch(),
    currentUser: Meteor.user(),
  };
})(EditBusiness);
