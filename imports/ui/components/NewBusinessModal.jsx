import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import AutoForm from 'uniforms-bootstrap4/AutoForm';

import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import Businesses from '/imports/api/businesses/businesses';
import Submissions from '/imports/api/submissions/submissions';

export default class NewBusinessModal extends React.Component {
  
  constructor( props ) {
    super(props);
    
    this.state = {
      modal: false,
      fields: {
        type: '',
      },
      errors: {
        yourName: false,
        yourEmail: false,
        yourPhone: false,
        graduated: false,
        name: false,
        website: false,
        phone: false,
        desc: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        photo: false,
      },
    };
    
    this.toggle = this.toggle.bind(this);
  }
  
  handleSubmit() {
    // TODO validate input
    // TODO if logged in as admin, enable direct insert
    
    Meteor.call('businesses.insert', {
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
      type: type,
      verified: true, // TODO set default to false
    });
    
    /*Submissions.insert({
      name: yourName,
      email: yourEmail,
      phoneNumber: yourPhone,
      gradYear: graduated,
      businessID: biz._id,
    });*/
    
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
        <Button outline color="primary" onClick={this.toggle}>
          <i className="fas fa-plus-circle pr-1" aria-hidden="true"/> Submit New Business
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Submit New Business</ModalHeader>
          <ModalBody>
            {this.renderForm(Businesses)}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit.bind(this)}>Submit for Review</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
  renderForm( {model} ) {
    return <AutoForm schema={Submissions.schema} onSubmit={post => this.handleSubmit(post)} model={model}/>;
  }
  
}
