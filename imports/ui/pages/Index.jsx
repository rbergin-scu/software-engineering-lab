import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import {
  Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row,
} from 'reactstrap';

import Businesses from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';
import NewBusinessModal from '/imports/ui/components/NewBusinessModal';
import Submissions from '/imports/api/submissions/submissions';

class Index extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      food: false,
      entertainment: false,
    };

    this.handleInput = this.handleInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {
    return (
      <div>
        <div className="bg-light py-3">
          { this.renderSubmit() }
        </div>
        <div className="container py-5">
        { this.renderFilters() }
          <section className="index-businesses">
            <div className="card-deck">
              { this.renderBusinesses() }
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  renderBusinesses() {
    return this.props.businesses.map((biz, i) => {
      return (
        <Business
          key={ i }
          name={ biz.name }
          desc={ biz.desc }
        />
      );
    });
  }
  
  renderSubmit() {
    return (
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col">
            <NewBusinessModal />
          </div>
          <div className="col text-right">
            <p className="mb-0">Hello, <u>admin</u></p>
          </div>
        </div>
      </div>
    );
  }

  renderFilters() {
    return (
      <Form className="formFilterBusinesses">
        <FormGroup tag="fieldset">
          <legend>Filter by Business Type</legend>

          <FormGroup>
            <Input type="checkbox" id="food" name="feature" value="food" onChange= { this.handleInput } />
                  
            <Label for="food">Food</Label>
          </FormGroup>

          <FormGroup>
            <Input type="checkbox" id="entertainment" name="feature" onChange= { this.handleInput }
                  value="entertainment" />
            <Label for="entertainment">Entertainment</Label>
          </FormGroup>

        </FormGroup>
    </Form>
      
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    
    this.setState(prevState => {
      return {
        [name]: {
          ...prevState.[name]: value;
        }
      }
    });
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('businesses');
  Meteor.subscribe('submissions');
  
  return {
    businesses: Businesses.find({ verified: true }).fetch(),
    submissions: Submissions.find({ }).fetch(),
  };
})(Index);
