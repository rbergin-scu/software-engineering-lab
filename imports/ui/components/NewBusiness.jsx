import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Col, Collapse, Form, FormGroup, FormText, Input, Label, Row, } from 'reactstrap';
import update from 'immutability-helper';

import { Businesses, Categories } from '/imports/api/businesses/businesses';
import Submissions from '/imports/api/submissions/submissions';

export default class NewBusiness extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      collapse: false,
      submission: {
        business: {
          category: Object.keys(Categories)[0],
        },
      },
      errors: { },
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
  
  renderField(name, type, placeholder, required, options) {
    return (
      <FormGroup row>
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
          { this.renderField('business.photo', 'file', '', false) }
          { this.renderField('business.phoneNumber', 'text', '(123) 456-7890', false) }
          { this.renderField('business.website', 'text', 'www.website.com', false) }
          { this.renderField('business.streetAddress', 'text', '', false) }
          <Row>
            <Col md={6}>
              { this.renderField('business.city', 'text', 'Bikini Bottom', false) }
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="state">State</Label>
                <Input type="select" className="form-control mb-2" name="business.state"
                       value={ this.state.submission.state } onChange={ this.handleInput }>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              { this.renderField('business.zip', 'text', '54321', false) }
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
        
        this.setState({
          errors: errors
        });
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
