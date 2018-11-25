import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Col, Collapse, Form, FormGroup, FormText, Input, Label, Row, } from 'reactstrap';
import update from 'immutability-helper';

import { Businesses, Categories } from '/imports/api/businesses/businesses';
import Submissions from '/imports/api/submissions/submissions';

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
    this.renderField = this.renderField.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  render() {
    console.log('errors? ', this.state.errors);
    return (
      <div className={ `${this.state.collapse ? 'py-5' : 'py-3'}` }>
        <h5 className={ `text-link text-white mb-0 ${this.state.collapse ? 'text-underline' : ''}` }
            onClick={ this.toggle }>
          Santa Clara Alum? Submit your proudly owned business to us.&nbsp;
          <i className={ `fa ${this.state.collapse ? 'fa-caret-down' : 'fa-caret-right' } pl-2` }
             aria-hidden="true" />
        </h5>
        <Collapse isOpen={ this.state.collapse } className="mt-3 p-5 bg-white shadow">
          { this.renderForm() }
          <div>
           <Button color="primary" onClick={ this.handleSubmit.bind(this) }>Submit for Review</Button>
          </div>
        </Collapse>
      </div>
    );
  }
  
  /**
   * Renders any generic form input field, including <select>, and automatically binds a listener to onChange events.
   *
   * @param name  <input name> attribute.
   * @param type  <input type> attribute.
   * @param placeholder <input placeholder> attribute.
   * @param required  <input required> attribute.
   * @param options If type <select>, the set of possible dropdown options.
   * @param column  If desired, set true to display form group as two columns rather than one row.
   */
  renderField(name, type, placeholder, required, options, column) {
    return (
      <FormGroup row={ column === undefined ? true : !column }>
        <Label for={ name } sm={ 2 }>{ Submissions.schema.label(name) }</Label>
        <Col sm={ 10 }>
          { (type === 'email' || type === 'file' || type === 'tel' || type === 'text') &&
          <input type={ type } name={ name } onChange={ this.handleInput }
                 className="form-control mb-2" placeholder={ placeholder } required={ required } />
          }
          
          { type === 'textarea' &&
          <textarea name={ name } onChange={ this.handleInput } className="form-control mb-2" required={ required } />
          }
          
          { type === 'select' &&
          <select name={ name } onChange={ this.handleInput }
                 className="form-control mb-2" value={ this.state.submission[name] }>
            { Object.entries(options).map(([key, value], i) => <option key={ i } value={ key }>{ value }</option>) }
          </select>
          }
          
          { this.state.errors[name] &&
          <span className="text-sans-bold text-warning">{ this.state.errors[name] && this.state.errors[name] }.</span>
          }
        </Col>
      </FormGroup>
    )
  }
  
  renderForm() {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <FormGroup tag="fieldset">
          <legend className="h5">A Little About You <hr /></legend>
          { this.renderField('gradName', 'text', 'John Doe', true) }
          { this.renderField('gradEmail', 'email', 'john@doe.org', false) }
          { this.renderField('gradPhone', 'tel', '(123) 456-7890', false) }
          { this.renderField('gradYear', 'text', '2006', true) }
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend className="h5">And Your Business <hr /></legend>
          { this.renderField('business.name', 'text', 'The Krusty Krab', true) }
          { this.renderField('business.description', 'textarea', '', true) }
          { this.renderField('business.category', 'select', '', true, Categories) }
          { this.renderField('business.photo', 'file', undefined, false) }
          { this.renderField('business.phoneNumber', 'text', '(123) 456-7890', false) }
          { this.renderField('business.website', 'text', 'www.website.com', false) }
          { this.renderField('business.streetAddress', 'text', '', false) }
          <Row>
            <Col md={6} className="px-0">
              { this.renderField('business.city', 'text', 'Bikini Bottom', false, undefined, true) }
            </Col>
            <Col md={3} className="px-0">
              { this.renderField('business.state', 'select', undefined, false, USStates, true) }
            </Col>
            <Col md={3} className="px-0">
              { this.renderField('business.zip', 'text', '54321', false, undefined, true) }
            </Col>
          </Row>
          <FormText color="muted">
            Note that this submission will be reviewed internally pending approval.
          </FormText>
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
    
    let newState;
    
    // if we've changed an item in a subobject, like Business inside Submission, we need to go deeper
    if (name.includes('.')) {
      newState = update(this.state, {
        submission: {
          // e.g. business.description --> submission: { business: { description: (value) } }
          [name.substring(0, name.indexOf('.'))]: {
            [name.substring(name.indexOf('.') + 1)]: { $set: value }
          }
        }
      });
    } else {
      newState = update(this.state, {
        submission: {
          [name]: { $set: value }
        }
      });
    }
  
    console.log(`handleInput: { ${name} => ${value} }`);
    this.setState(newState);
  }
  
  /**
   * Attempts to validate the form input fields found in the current state against the Submission schema.
   * If successful, the Submission will be created.
   *
   * @param e The Submit button target.
   */
  handleSubmit(e) {
    e.preventDefault();
    
    let submission = this.state.submission;
  
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
        // otherwise, attempt to insert the new Submission
        
        // normalize phone #s
        submission.gradPhone = submission.gradPhone.replace(/\D/g,'');
        submission.business.phoneNumber = submission.business.phoneNumber.replace(/\D/g,'');
  
        Meteor.call('submissions.insert', submission, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            this.toggle();
          }
        });
      }
    });
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  
}
