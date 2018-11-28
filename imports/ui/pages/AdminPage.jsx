import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Button, Col, FormGroup, Input, Label, } from 'reactstrap';

import Submissions from '/imports/api/submissions/submissions';
import SubmissionCard from '/imports/ui/components/SubmissionCard';

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
  
  handleLogin(e) {
    this.handleInput(e);
    this.handleSubmit(e);
  }
  
  /**
   * Attempt to login with the information provided.
   *
   * @param e The login submit button.
   */
  handleSubmit(e) {
    e.preventDefault();
    
    Meteor.loginWithPassword('admin', this.state.submission.password, (err, res) => {
      if (err) {
        document.getElementById('login').reset();
        this.error(err);
      }
    });
  }

  error(e) {
    this.setState({ error: `${e.error}: ${e.details}` });
  }
  
  toggle() {
    this.setState({ modal: !this.state.modal });
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('submissions.all');

  return {
    submissions: Submissions.find().fetch(),
    currentUser: Meteor.user(),
  };
})(AdminPage);
