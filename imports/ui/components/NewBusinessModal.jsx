import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row,
} from 'reactstrap';

import Businesses from '/imports/api/businesses/businesses';
import Submissions from '/imports/api/submissions/submissions';

export default class NewBusinessModal extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      selectType: '',
    };
    
    this.toggle = this.toggle.bind(this);
  }
  
  handleSelectType(e) {
    this.setState({ selectType: e.target.value });
  }
  
  handleSubmit() {
    // info about submitter
    const yourName = ReactDOM.findDOMNode(this.refs.yourName).value;
    const yourEmail = ReactDOM.findDOMNode(this.refs.yourEmail).value;
    const yourPhone = ReactDOM.findDOMNode(this.refs.yourPhone).value;
    const graduated = ReactDOM.findDOMNode(this.refs.graduated).value;
  
    // info about business
    const name = ReactDOM.findDOMNode(this.refs.name).value;
    const website = ReactDOM.findDOMNode(this.refs.website).value;
    const phone = ReactDOM.findDOMNode(this.refs.phone).value;
    const desc = ReactDOM.findDOMNode(this.refs.desc).value;
    const address = ReactDOM.findDOMNode(this.refs.address).value;
    const city = ReactDOM.findDOMNode(this.refs.city).value;
    const state = ReactDOM.findDOMNode(this.refs.state).value;
    const zip = ReactDOM.findDOMNode(this.refs.zip).value;
    const photo = ReactDOM.findDOMNode(this.refs.photo).value;
    
    // TODO validate input
    // TODO if logged in as admin, enable direct insert
    
    const biz = Businesses.insert({
      name: name,
      desc: desc,
      photo: photo,
      country: 'United States',
      streetAddress: address,
      state: state,
      city: city,
      zip: zip,
      phoneNumber: phone,
      website: website,
      type: this.state.selectType,
      verified: true,
    });
    console.log(biz._id);
    /*Submissions.insert({
      name: yourName,
      email: yourEmail,
      phoneNumber: yourPhone,
      gradYear: graduated,
      businessID: biz._id,
    });*/
    
    console.log('Submission successful');
    this.toggle();
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal,
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ this.handleSubmit.bind(this) }>Submit for Review</Button>{' '}
            <Button color="secondary" onClick={ this.toggle }>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
  renderForm() {
    return (
      <Form className="formNewBusiness">
        <FormGroup tag="fieldset">
          <legend className="h4">A Little About You</legend>
          <FormGroup>
            <Label for="yourName">Your Name</Label>
            <Input type="text" ref="yourName" id="newBusinessYourName" placeholder="Your full name" />
          </FormGroup>
          <FormGroup>
            <Label for="yourEmail">Email</Label>
            <Input type="email" ref="yourEmail" id="newBusinessYourEmail" placeholder="Your email" />
          </FormGroup>
          <FormGroup>
            <Label for="yourPhone">Phone</Label>
            <Input type="tel" ref="yourPhone" id="newBusinessYourPhone" placeholder="Your phone #" />
          </FormGroup>
          <FormGroup>
            <Label for="graduated">Graduation Year</Label>
            <Input type="text" ref="graduated" id="newBusinessGraduated" placeholder="Your graduation year" />
          </FormGroup>
        </FormGroup>
        <hr />
        <FormGroup tag="fieldset">
          <legend className="h4">And Your Business</legend>
          <FormGroup>
            <Label for="name">Business Name</Label>
            <Input type="text" ref="name" id="newBusinessName" placeholder="The Krusty Krab" />
          </FormGroup>
          <FormGroup>
            <Label for="website">Website</Label>
            <Input type="tel" ref="website" id="newBusinessPhone" placeholder="www.yourwebsite.com" />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="tel" ref="phone" id="newBusinessPhone" placeholder="(111) 222-3333" />
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <Input type="select" id="newBusinessType" onChange={ this.handleSelectType }>
              <option value="Entertainment">Entertainment</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="desc">Brief Description</Label>
            <Input type="text" ref="desc" id="newBusinessDesc" placeholder="A fictional fast food restaurant in the American animated TV series SpongeBob SquarePants." />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" ref="address" id="newBusinessAddress" placeholder="111 Conch St" />
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input type="text" ref="city" id="newBusinessCity" placeholder="Bikini Bottom" />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="state">State</Label>
                <Input type="select" ref="state" id="newBusinessState">
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
                <Input type="text" ref="zip" id="newBusinessZip" placeholder="12345" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="photo">A Nice Photo</Label>
            <Input type="file" ref="photo" id="newBusinessPhoto" />
            <FormText color="muted">
              Note that this submission will be reviewed internally pending approval.
            </FormText>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }

}
