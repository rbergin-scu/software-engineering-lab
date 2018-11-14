import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row,
} from 'reactstrap';
import Submissions from '/imports/api/submissions/submissions';
import Submission from '/imports/ui/components/Submission';

import Businesses from '/imports/api/businesses/businesses';

class AdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submission: {
        password: null
      },
    };

    this.error = this.error.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.setState(prevState => {
      return {
        submission: {
          ...prevState.submission, [name]: value
        }
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    Meteor.loginWithPassword("admin", this.state.submission.password, function(err) {
      if(err) {
        document.getElementById("login").reset();
        alert(err.message);
      }
    });
  }

  handleLogin(e) {
    this.handleInput(e);
    this.handleSubmit(e);
  }

  renderSubmissions() {
      return this.props.submissions.map((sub, i) => {
        return (
          <Submission
            key={ i }
            name={ sub.business.name }
            submitterName={ sub.name }
            email={ sub.email }
            phoneNumber={ sub.phoneNumber }
            gradYear={ sub.gradYear }
            id = { sub._id }
            business = { sub.business }
          />
        );
      });
  }



  render() {
    console.log(this.props.currentUser);
    if(!Meteor.user()) {
      return (
        <div className="container py-5">
          <form className="login" id ="login">
            <FormGroup row>
              <Label for="password" sm={1}>Password</Label>
              <Col sm={5}>
                <Input type="password" name="password" placeholder="*****"
                       onChange={ this.handleInput } />
              </Col>
            </FormGroup>
            <Button color="primary" onClick={ this.handleLogin.bind(this) }>Login</Button>
          </form>
        </div>
      );
    }
    else {
      return (
        <div className="container py-5">
          <h2>Submissions</h2>
          <div className="container py-5">
            <section className="index-submissions">
              <div className="card-deck">
                { this.renderSubmissions() }
              </div>
            </section>
          </div>
          <div>

            <form className="logout">
              <Button color="primary" onClick={ Meteor.logout }>Logout</Button>
            </form>
          </div>
        </div>
      );
    }

  }

  error(e) {
    this.setState({ error: `${e.error}: ${e.details}` });
  }
  
  toggle() {
    this.setState({ modal: !this.state.modal });
  }
}
export default withTracker(() => {
  Meteor.subscribe('submissions');
  Meteor.subscribe('businesses');

  return {
    submissions: Submissions.find({ }).fetch(),
    currentUser: Meteor.user(),
  };
})(AdminPage);
