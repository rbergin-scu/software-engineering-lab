import update from 'immutability-helper';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Col, Collapse, Form, FormGroup, FormText, Row, } from 'reactstrap';

import { Categories, USStates } from '/imports/api/businesses/businesses';
import InputField from '/imports/ui/components/InputField';
import Photos from '/imports/api/photos/photos';

/**
 * A collapsable component that provides a form for anyone to submit a business they would like to see in the database.
 */
export default class NewBusiness extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      /* whether the form is open */
      collapse: false,
      
      /* latest form validation errors */
      errors: { },
      
      /* latest form input values */
      submission: {
        business: {
          category: Object.keys(Categories)[0],
        },
      },
    };
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  render() {
    return (
      <div className={ `py-${this.state.collapse ? '5' : '3'}` }>
        <h5 className={ `text-link text-white mb-0 ${this.state.collapse ? 'text-underline' : ''}` }
            onClick={ this.toggle }>
          Santa Clara Alum? Submit your proudly owned business to us.&nbsp;
          <i className={ `fa fa-caret-${this.state.collapse ? 'down' : 'right'} pl-2` }
             aria-hidden="true" />
        </h5>
        <Collapse isOpen={ this.state.collapse } className="mt-3 p-5 bg-white shadow">
          { this.renderForm() }
          <div>
           <Button color="primary" onClick={ this.handleSubmit }>Submit for Review</Button>
          </div>
        </Collapse>
      </div>
    );
  }
  
  renderForm() {
    if(Meteor.user()) {
      return (
        <Form onSubmit={ this.handleSubmit }>
          <FormGroup tag="fieldset">
            <legend className="h5">Your Business <hr /></legend>
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.name'] }
              name="business.name" type="text" placeholder="The Krusty Krab" required />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.description'] }
              name="business.description" type="textarea" required />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.category'] }
              name="business.category" type="select" options={ Categories } required />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.photo'] }
              name="business.photo" type="file" />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.phoneNumber'] }
              name="business.phoneNumber" type="tel" placeholder="(123) 456-7890" />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.website'] }
              name="business.website" type="text" placeholder="www.website.com" />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.streetAddress'] }
              name="business.streetAddress" type="text" placeholder="123 Conch St" />
            <Row>
              <Col md={6} className="px-0">
                <InputField
                  handle={ this.handleInput } error={ this.state.errors['business.city'] }
                  name="business.city" type="text" placeholder="Bikini Bottom" isColumn={ true } />
              </Col>
              <Col md={3} className="px-0">
                <InputField
                  handle={ this.handleInput } error={ this.state.errors['business.state'] }
                  name="business.state" type="select"
                  options={ USStates } isColumn={ true } />
              </Col>
              <Col md={3} className="px-0">
                <InputField
                  handle={ this.handleInput } error={ this.state.errors['business.zip'] }
                  name="business.zip" type="text" placeholder="97068" isColumn={ true } />
              </Col>
            </Row>
            <FormText color="muted">
              Note that this submission will be reviewed internally pending approval.
            </FormText>
          </FormGroup>
        </Form>
      );
    } else {
      return (
        <Form onSubmit={ this.handleSubmit }>
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
          <FormGroup tag="fieldset">
            <legend className="h5">And Your Business <hr /></legend>
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.name'] }
              name="business.name" type="text" placeholder="The Krusty Krab" required />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.description'] }
              name="business.description" type="textarea" required />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.category'] }
              name="business.category" type="select" options={ Categories } required />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.photo'] }
              name="business.photo" type="file" />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.phoneNumber'] }
              name="business.phoneNumber" type="tel" placeholder="(123) 456-7890" />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.website'] }
              name="business.website" type="text" placeholder="www.website.com" />
            <InputField
              handle={ this.handleInput } error={ this.state.errors['business.streetAddress'] }
              name="business.streetAddress" type="text" placeholder="123 Conch St" />
            <Row>
              <Col md={4} className="px-0">
                <InputField
                  handle={ this.handleInput } error={ this.state.errors['business.city'] }
                  name="business.city" type="text" placeholder="Bikini Bottom" isColumn={ true } />
              </Col>
              <Col md={4} className="px-0">
                <InputField
                  handle={ this.handleInput } error={ this.state.errors['business.state'] }
                  name="business.state" type="select" options={ USStates } isColumn={ true } />
              </Col>
              <Col md={4} className="px-0">
                <InputField
                  handle={ this.handleInput } error={ this.state.errors['business.zip'] }
                  name="business.zip" type="text" placeholder="97068" isColumn={ true } />
              </Col>
            </Row>
            <FormText color="muted">
              Note that this submission will be reviewed internally pending approval.
            </FormText>
          </FormGroup>
        </Form>
      );
    }
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
   * Attempts to validate the form input fields found in the current state against the Submission schema.
   * If successful, the Submission will be created. Otherwise, validation errors will be returned.
   *
   * @param e The Submit button target.
   */
  handleSubmit(e) {
    e.preventDefault();
    
    let submission = this.state.submission;

    const business = {
      name: submission.business.name,
      description: submission.business.description,
      photo: submission.business.photo,
      country: submission.business.country,
      streetAddress: submission.business.streetAddress,
      state: submission.business.state,
      city: submission.business.city,
      zip: submission.business.zip,
      phoneNumber: submission.business.phoneNumber,
      website: submission.business.website,
      category: submission.business.category
    }
    
    /* first, sanitize submitted info */
    // convert strings to numbers
    if (submission.gradYear) submission.gradYear = parseInt(submission.gradYear);
        
    // normalize phone #s
    if (submission.gradPhone) submission.gradPhone = submission.gradPhone.replace(/\D/g,'');
    if (submission.business.phoneNumber) submission.business.phoneNumber = submission.business.phoneNumber.replace(/\D/g,'');

    if(Meteor.user()) {
      Meteor.call('businesses.validate', submission, (err, res) => {
        // if there were validation errors, update error state to reflect
        if (res) {
          const errors = res.reduce((list, e) => {
            list[e.name] = e.message;
            return list;
          }, {});

          this.setState({ errors: errors });
        } else {
          Meteor.call('businesses.insert', business, (err, res) => {
            if (err) throw err;

            this.toggle();
          });
        }
      });
      this.toggle();
    } else {
      // attempt to validate newest submission
      Meteor.call('submissions.validate', submission, (err, res) => {
        // if there were validation errors, update error state to reflect
        if (res) {
          const errors = res.reduce((list, e) => {
            list[e.name] = e.message;
            return list;
          }, {});

          this.setState({ errors: errors });
        } else {
          Meteor.call('submissions.insert', submission, (err, res) => {
            if (err) throw err;
          
            this.toggle();
          });
        }
      });
    }
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
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  
}
