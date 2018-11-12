import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row,
} from 'reactstrap';

import Error from './Error';

/* an index of all possible business categories */
const categories = [ 'entertainment', 'food' ];

export default class NewBusinessModal extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      error: '',
      modal: false,
      submission: {
        yourName: '',
        yourEmail: '',
        yourPhone: '',
        gradYear: '',
        name: '',
        desc: '',
        photo: '',
        category: categories[0],
        country: '',
        streetAddress: '',
        state: '',
        city: '',
        zip: '',
        phoneNumber: '',
        website: '',
        verified: false,
      },
    };
    
    this.error = this.error.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
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
    
    const business = {
      name: this.state.submission.name,
      desc: this.state.submission.desc,
      photo: this.state.submission.photo,
      country: this.state.submission.country,
      streetAddress: this.state.submission.streetAddress,
      state: this.state.submission.state,
      city: this.state.submission.city,
      zip: this.state.submission.zip,
      phoneNumber: this.state.submission.phoneNumber,
      website: this.state.submission.website,
      category: this.state.submission.category,
      verified: this.state.submission.verified,
    };
  
    Meteor.call('submissions.insert', {
      name: this.state.submission.yourName,
      email: this.state.submission.yourEmail,
      phoneNumber: this.state.submission.yourPhone,
      gradYear: parseInt(this.state.submission.gradYear),
      business: business,
    }, (err, res) => {
      if (err) {
        this.error(err);
      } else {
        this.toggle();
      }
    });
  }
  
  render() {
    return (
      <div>
        <Button outline color="primary" onClick={ this.toggle }>
          <i className="fas fa-plus-circle pr-1" aria-hidden="true" /> Submit New Business
        </Button>
        <Modal isOpen={ this.state.modal } toggle={ this.toggle } className={ this.props.className }>
          <ModalHeader toggle={ this.toggle }>Submit New Business</ModalHeader>
          <ModalBody>
            { this.renderForm() }
            <Error details={ this.state.error } />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ this.handleSubmit.bind(this) }>Submit for Review</Button>
            <Button color="secondary" onClick={ this.toggle }>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
  renderForm() {
    return (
      <Form className="formNewBusiness" onSubmit={ this.handleSubmit }>
        <FormGroup tag="fieldset">
          <legend className="h4">A Little About You</legend>
          <FormGroup>
            <Label for="yourName">Your Name</Label>
            <Input type="text" name="yourName" placeholder="Your full name"
                   onChange={ this.handleInput } required />
          </FormGroup>
          <FormGroup>
            <Label for="yourEmail">Email</Label>
            <Input type="email" name="yourEmail" placeholder="Your email"
                   onChange={ this.handleInput } />
          </FormGroup>
          <FormGroup>
            <Label for="yourPhone">Phone</Label>
            <Input type="tel" name="yourPhone" placeholder="Your phone #"
                   onChange={ this.handleInput } />
          </FormGroup>
          <FormGroup>
            <Label for="gradYear">Graduation Year</Label>
            <Input type="tel" name="gradYear" placeholder="Your graduation year"
                   onChange={ this.handleInput } required />
          </FormGroup>
        </FormGroup>
        <hr />
        <FormGroup tag="fieldset">
          <legend className="h4">And Your Business</legend>
          <FormGroup>
            <Label for="name">Business Name</Label>
            <Input type="text" name="name" placeholder="The Krusty Krab"
                   onChange={ this.handleInput } required />
          </FormGroup>
          <FormGroup>
            <Label for="website">Website</Label>
            <Input type="text" name="website" placeholder="www.yourwebsite.com"
                   onChange={ this.handleInput } />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="tel" name="phoneNumber" placeholder="(111) 222-3333"
                   onChange={ this.handleInput } />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input type="select" name="category"
                   onChange={ this.handleInput } required>
              <option name="entertainment" value="entertainment">Entertainment</option>
              <option name="food" value="food">Food</option>
              <option name="service" value="service">Service</option>
              <option name="manufacturing" value="manufacturing">Manufacturing</option>
              <option name="merchandising" value="merchandising">Merchandising</option>
              <option name="management" value="management">Management</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="desc">Brief Description</Label>
            <Input type="text" name="desc" placeholder="A fictional fast food restaurant in the American animated TV series SpongeBob SquarePants."
                   onChange={ this.handleInput } required />
          </FormGroup>
          <FormGroup>
            <Label for="streetAddress">Address</Label>
            <Input type="text" name="streetAddress" placeholder="111 Conch St"
                   onChange={ this.handleInput } required />
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input type="text" name="city" placeholder="Bikini Bottom"
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
                <Input type="text" name="zip" placeholder="12345"
                       onChange={ this.handleInput } />
              </FormGroup>
              <FormGroup>
                <Input type="checkbox" id="verified" name="verified" value="verified" onChange= { this.handleInput } />
                <Label for="verified">Verified</Label>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="photo">A Nice Photo</Label>
            <Input type="file" name="photo"
                   onChange={ this.handleInput } />
            <FormText color="muted">
              Note that this submission will be reviewed internally pending approval.
            </FormText>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }
  
  error(e) {
    this.setState({ error: `${e.error}: ${e.details}` });
  }
  
  toggle() {
    this.setState({ modal: !this.state.modal });
  }
  
}
