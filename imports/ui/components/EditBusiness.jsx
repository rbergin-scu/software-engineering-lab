import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Col, Form, FormGroup, Row, } from 'reactstrap';
import update from 'immutability-helper';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import { Businesses, Categories } from '/imports/api/businesses/businesses';
import EditRequests from '/imports/api/editRequests/editRequests';
import InputField from '/imports/ui/components/InputField';

const USStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

class EditBusiness extends React.Component {
  
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
  }
  
  render() {
    return (
      <div className="business-editing bg-light p-3 px-4 border-top border-right border-bottom shadow">
        { Meteor.user() ? this.renderAdminForm() : this.renderForm() }
        <div>
          <Button color="primary" onClick={ this.handleSubmit.bind(this) }>Update Business</Button>
          <Button outline color="secondary" onClick={ this.props.done } className="ml-2">Cancel</Button>
        </div>
      </div>
    );
  }
  
  renderForm() {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <FormGroup tag="fieldset">
          <legend className="h5">{ this.state.submission.name }<hr /></legend>
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
            <Col md={6} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['city'] }
                name="business.city" type="text" value={ this.state.submission.city } isColumn={ true } />
            </Col>
            <Col md={3} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['state'] }
                name="business.state" type="select" value={ this.state.submission.state }
                options={ USStates } isColumn={ true } />
            </Col>
            <Col md={3} className="px-0">
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
          <legend className="h5">{ this.state.submission.name }<hr /></legend>
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
            <Col md={6} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['city'] }
                name="business.city" type="text" value={ this.state.submission.city } isColumn={ true } />
            </Col>
            <Col md={3} className="px-0">
              <InputField
                handle={ this.handleInput } error={ this.state.errors['state'] }
                name="business.state" type="select" value={ this.state.submission.state }
                options={ USStates } isColumn={ true } />
            </Col>
            <Col md={3} className="px-0">
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
        // normalize phone #
        request.business.phoneNumber = request.business.phoneNumber.replace(/\D/g,'');
        request.gradPhone = request.gradPhone.replace(/\D/g,'');

        if(Meteor.user()) {
          Meteor.call('businesses.update', this.props.existing[0]._id, request.business, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              this.props.done();
            }
          });
        } else {
          Meteor.call('editRequests.insert', request, (err, res) => {
            if(err) {
              console.log(err);
            } else {
              this.props.done();
            }
          });
        }
      }
    });
  }
  
}

export default withTracker((props) => {
  Meteor.subscribe('businesses.public');
  Meteor.subscribe('editRequests');
  
  return {
    existing: Businesses.find({ _id: props.id }).fetch(),
    currentUser: Meteor.user(),
  };
})(EditBusiness);
