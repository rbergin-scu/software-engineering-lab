import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import {
  Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row,
} from 'reactstrap';

import { Businesses, Categories } from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';
import NewBusinessModal from '/imports/ui/components/NewBusinessModal';
import Submissions from '/imports/api/submissions/submissions';

class Index extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      categories: {},
    };
    
    for (let c of Object.keys(Categories)) {
      this.state.categories[c] = false;
    }

    this.handleInput = this.handleInput.bind(this);
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
    let filters = Object.keys(this.state.categories).filter(c => this.state.categories[c]);
    
    return this.props.businesses.filter(biz => filters.includes(biz.category)).map((biz, i) => {
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
          { Object.entries(Categories).map(([c, name], i) =>
            <FormGroup key={ i }>
              <Input type="checkbox" name="feature" id={ c } value={ c } onChange={ this.handleInput } />
              <Label for={ c }>{ name }</Label>
            </FormGroup>
          ) }
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
  Meteor.subscribe('businesses.public');
  
  return {
    businesses: Businesses.find({}).fetch(),
    submissions: Submissions.find({ }).fetch(),
    currentUser: Meteor.user(),
  };
  
})(Index);
