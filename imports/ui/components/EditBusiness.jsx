import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Button, Col, Collapse, Form, FormGroup, FormText, Input, Label, Row,
} from 'reactstrap';

import { Businesses, Categories } from '/imports/api/businesses/businesses';

class EditBusiness extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      submission: this.props.existing[0],
    };
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {
    return (
      <div className="business-editing bg-light p-3 px-4 border-top border-right border-bottom shadow">
        { this.renderForm() }
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
          <FormGroup row>
            <Label for="name" sm={3}>Name</Label>
            <Col sm={9}>
              <Input type="text" name="name" value={ this.state.submission.name }
                     onChange={ this.handleInput } required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="website" sm={3}>Website</Label>
            <Col sm={9}>
              <Input type="text" name="website" value={ this.state.submission.website }
                     onChange={ this.handleInput } />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="phone" sm={3}>Phone</Label>
            <Col sm={9}>
              <Input type="tel" name="phoneNumber" value={ this.state.submission.phoneNumber }
                     onChange={ this.handleInput } />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="category" sm={3}>Category</Label>
            <Col sm={9}>
              <Input type="select" name="category"
                     onChange={ this.handleInput } required>
                <option name="entertainment" value="entertainment">Entertainment</option>
                <option name="food" value="food">Food</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="desc" sm={3}>Description</Label>
            <Col sm={9}>
              <Input type="textarea" name="desc" value={ this.state.submission.desc }
                     onChange={ this.handleInput } required />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="photo" sm={3}>Photo</Label>
            <Col sm={9}>
              <Input type="file" name="photo"
                     onChange={ this.handleInput } />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="streetAddress">Address</Label>
            <Input type="text" name="streetAddress" value={ this.state.submission.streetAddress }
                   onChange={ this.handleInput } required />
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input type="text" name="city" value={ this.state.submission.city }
                       onChange={ this.handleInput } />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="state">State</Label>
                <Input type="select" name="state" value={ this.state.submission.state }
                       onChange={ this.handleInput }>
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
              <FormGroup>
                <Label for="zip">ZIP</Label>
                <Input type="text" name="zip" value={ this.state.submission.zip }
                       onChange={ this.handleInput } />
              </FormGroup>
            </Col>
          </Row>
          <FormText color="muted">
            Since you're an admin, changes made here will show up for everyone else.
          </FormText>
        </FormGroup>
      </Form>
    );
  }
  
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
    
    console.log(`handleInput: ${name} => ${value}]`);
    
    this.setState(prevState => {
      return {
        submission : {
          ...prevState.submission, [name]: value
        }
      }
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    // uniquely identify just the submit button
    if (e.target.classList.contains('btn-primary')) {
      Meteor.call('businesses.update', this.state.submission, (err, res) => {
        console.log('err'+err);
        console.log('res'+res);
      });
    }
  
    this.props.done();
  }
  
}

export default withTracker((props) => {
  Meteor.subscribe('businesses.public');
  
  return {
    existing: Businesses.find({ _id: props.id }).fetch(),
    currentUser: Meteor.user(),
  };
})(EditBusiness);
