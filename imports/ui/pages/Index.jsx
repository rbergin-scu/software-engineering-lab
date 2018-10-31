import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

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
      categories: {
        Food: false,
        Entertainment: false,
      }
    };

    this.handleInput = this.handleInput.bind(this);
  }
  
  render() {
    console.log('Begin page render')
    //Session.set("categories", "Food")
    console.log(Session.get("categories"))
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

    if (this.state.categories.Food && !this.state.categories.Entertainment) {
      return Businesses.find({ verified: true, categories: 'Food'}).fetch().map((biz, i) => {
        return (
          <Business
            key={ i }
            name={ biz.name }
            desc={ biz.desc }
          />
        );
      });
    } else if (!this.state.categories.Food && this.state.categories.Entertainment) {
      return Businesses.find({ verified: true, categories: 'Entertainment'}).fetch().map((biz, i) => {
        return (
          <Business
            key={ i }
            name={ biz.name }
            desc={ biz.desc }
          />
        );
      });
    } else {
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
            <Input type="checkbox" id="Food" name="feature" value="Food" onChange= { this.handleInput } />
                  
            <Label for="food">Food</Label>
          </FormGroup>

          <FormGroup>
            <Input type="checkbox" id="Entertainment" name="feature" onChange= { this.handleInput }
                  value="Entertainment" />
            <Label for="Entertainment">Entertainment</Label>
          </FormGroup>

        </FormGroup>
    </Form>
      
    );
  }

  handleInput(e) {
    let checked = e.target.checked;
    let name = e.target.value;
    
    this.setState(prevState => {
      return {
        categories : {
          ...prevState.categories, [name]: checked
        }
      }
    });

    console.log(this.state.categories);
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('businesses');
  Meteor.subscribe('submissions');
  console.log("Touching database...");

  return {
        businesses: Businesses.find({ verified: true}).fetch(),
        submissions: Submissions.find({ }).fetch(),
      };

  
})(Index);
