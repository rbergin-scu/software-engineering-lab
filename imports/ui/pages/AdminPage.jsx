import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, } from 'reactstrap';

import Submissions from '/imports/api/submissions/submissions';
import SubmissionCard from '/imports/ui/components/SubmissionCard';
import EditRequests from '/imports/api/editRequests/editRequests';
import EditRequestCard from '/imports/ui/components/EditRequestCard';
import RemovalRequests from '/imports/api/removalRequests/removalRequests';
import RemovalRequestCard from '/imports/ui/components/RemovalRequestCard';
import {Businesses} from '/imports/api/businesses/businesses';

/**
 * The admin-only interface that provides Alumni Office users the ability to view submissions (and deny/approve them
 * individually) and reports about the system.
 */
class AdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submission: {
        password: null,
      },
    };

    this.error = this.error.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  render() {
    return (
      <div className="container py-5">
      { this.props.currentUser ? (
        <div>
          <h2>Submissions</h2>
          <section className="index-submissions mb-5">
            <div className="row">
              { this.renderSubmissions() }
            </div>
          </section>
          <form>
            <Button color="primary" onClick={ Meteor.logout }>Logout</Button>
          </form>
        </div>
      ) : (
        <div>
          { this.state.error &&
            <p>Whoops! { this.state.error }</p>
          }
          <form id="login">
            <FormGroup row>
              <Label for="password" sm={ 1 }>Password</Label>
              <Col sm={ 5 }>
                <Input type="password" name="password" placeholder="******************" onChange={ this.handleInput } />
              </Col>
            </FormGroup>
            <Button color="primary" onClick={ this.handleLogin }>Login</Button>
          </form>
        </div>
      )}
      </div>
    );
  }
  
  renderSubmissions() {
    return this.props.submissions.map((sub, i) => {
      return (
        <SubmissionCard
          key={ i }
          submission={ sub }
        />
      );
    });
  }

  /**
   * Updates this.state to reflect a new change to a form field.
   *
   * Just add `onChange={ this.handleInput }` to the input field markup.
   *
   * @param e The generic form field to interpret.
   */
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

  /**
   * Attempt to login with the information provided.
   *
   * @param e The login submit button.
   */
  handleSubmit(e) {
    e.preventDefault();
    Meteor.loginWithPassword("admin", this.state.submission.password, function(err) {
      if(err) {
        document.getElementById("login").reset();
        this.error(err);
        alert(err.message);
      }
    });
  }

  /**
   * Calls both handleInput and handleSubmit to read a password from a field and use it to attempt to login
   * @param e The Login button target
   */
  handleLogin(e) {
    this.handleInput(e);
    this.handleSubmit(e);
  }

  renderSubmissions() {
      return this.props.submissions.map((sub, i) => {
        const submission = {
          name: sub.business.name,
          submitterName: sub.gradName,
          email: sub.gradEmail,
          phoneNumber: sub.gradPhone,
          gradYear: sub.gradYear,
          id: sub._id,
          business: sub.business,
        };
        return (
          <SubmissionCard
            key={ i }
            submission={ submission }
          />
        );
      });
  }

  renderEditRequests() {
    return this.props.editRequests.map((edit, i) => {
      const edits = {
        name: edit.business.name,
        submitterName: edit.gradName,
        email: edit.gradEmail,
        phoneNumber: edit.gradPhone,
        gradYear: edit.gradYear,
        requestId: edit._id,
        business: edit.business,
        businessId: edit.businessId,
      };
      return (
        <EditRequestCard
          key={ i }
          edits = { edits }
        />
      );
    });
  }

  renderRemovalRequests() {
    return this.props.removalRequests.map((remove, i) => {
      const removal = {
        name: remove.business.name,
        submitterName: remove.gradName,
        email: remove.gradEmail,
        phoneNumber: remove.gradPhone,
        gradYear: remove.gradYear,
        reason: remove.reason,
        requestId: remove._id,
        business: remove.business,
        businessId: remove.businessId,
      };
      return (
        <RemovalRequestCard
          key={ i }
          removal = { removal }
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
          <h2>Report</h2>
          <div className="container py-5">
            <section className="report">
              <div>
                <p> # of Businesses in the Directory: {Businesses.find({}).count()}</p>
                <p> # of Submissions in the Directory: {Submissions.find({}).count()}</p>
                <p> # of Edit Requests in the Directory: {EditRequests.find({}).count()}</p>
                <p> # of Removal Requests in the Directory: {RemovalRequests.find({}).count()}</p>
              </div>
            </section>
          </div>
          <h2>Submissions</h2>
          <div className="container py-5">
            <section className="index-submissions">
              <div className="card-deck">
                { this.renderSubmissions() }
              </div>
            </section>
          </div>
          <h2>Edit Requests</h2>
          <div className="container py-5">
            <section className="index-editRequests">
              <div className="card-deck">
                { this.renderEditRequests() }
              </div>
            </section>
          </div>
          <h2>Removal Requests</h2>
          <div className="container py-5">
            <section className="index-editRequests">
              <div className="card-deck">
                { this.renderRemovalRequests() }
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
  Meteor.subscribe('businesses.all');
  Meteor.subscribe('editRequests');
  Meteor.subscribe('removalRequests');

  return {
    businesses: Businesses.find({}).fetch(),
    submissions: Submissions.find({}).fetch(),
    editRequests: EditRequests.find({}).fetch(),
    removalRequests: RemovalRequests.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(AdminPage);
