import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Col, Form, FormGroup, Row, } from 'reactstrap';
import update from 'immutability-helper';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

/**
 * A component embedded inline to all Submissions, EditRequests, and RemovalRequests when viewed by administrators.
 * Allows for the viewing of more detailed information regarding submissions, edit requests, and removal requests
 */
class BusinessDetails extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      /* latest form validation errors */
      errors: { },
    };

  }
  
  render() {
    if(this.props.type == "update") {
      return (
        <div className="business-editing bg-light p-3 px-4 border-top border-right border-bottom shadow">
          { this.renderUpdateDetails() }
        </div>
      );
    } else {
      return (
        <div className="business-editing bg-light p-3 px-4 border-top border-right border-bottom shadow">
          { this.renderBusinessDetails() }
        </div>
      );
    }
  }
  
  renderBusinessDetails() {
    return (
      <div>
        <legend className="h5">{this.props.business.name}<hr /></legend>
        <p >Description: {this.props.business.description}</p>
        <p>Category: {this.props.business.category}</p>
        <p>Phone Number: {this.props.business.phoneNumber}</p>
        <p>Website: {this.props.business.website}</p>
        <p>Street Address: {this.props.business.streetAddress}</p>
        <p>State: {this.props.business.state}</p>
        <p>Zip: {this.props.business.zip}</p>
      </div>
    );
  }

  renderUpdateDetails() {
    return (
      <div>
        <legend className="h5">Suggested Updates for: {this.props.business.name}<hr /></legend>
        <p>Description: {this.props.business.description}</p>
        <p>Category: {this.props.business.category}</p>
        <p>Phone Number: {this.props.business.phoneNumber}</p>
        <p>Website: {this.props.business.website}</p>
        <p>Street Address: {this.props.business.streetAddress}</p>
        <p>State: {this.props.business.state}</p>
        <p>Zip: {this.props.business.zip}</p>
      </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('businesses.public');
  
  return {
    currentUser: Meteor.user(),
  };
})(BusinessDetails);
