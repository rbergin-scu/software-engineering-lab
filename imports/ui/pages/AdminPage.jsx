import { Meteor } from 'meteor/meteor';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Button, Col, FormGroup, Input, Label, } from 'reactstrap';

import Submissions from '/imports/api/submissions/submissions';
import SubmissionCard from '/imports/ui/components/SubmissionCard';

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
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  render() {
    if (!Meteor.user()) {
      return (
        <div className="container py-5">
          <form className="login" id="login">
            <FormGroup row>
              <Label for="password" sm={1}>Password</Label>
              <Col sm={5}>
                <Input type="password" name="password" placeholder="******************" onChange={this.handleInput}/>
              </Col>
            </FormGroup>
            <Button color="primary" onClick={this.handleLogin}>Login</Button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="container py-5">
          <h2>Submissions</h2>
          <div className="container py-5">
            <section className="index-submissions">
              <div className="card-deck">
                {this.renderSubmissions()}
              </div>
            </section>
          </div>
          <div>
            <form className="logout">
              <Button color="primary" onClick={Meteor.logout}>Logout</Button>
            </form>
          </div>
        </div>
      );
    }
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

  handleSubmit(e) {
    e.preventDefault();
    
    Meteor.loginWithPassword('admin', this.state.submission.password, (err, res) => {
      if (err) {
        document.getElementById('login').reset();
        alert(err.message);
      }
    });
  }

  handleLogin(e) {
    this.handleInput(e);
    this.handleSubmit(e);
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
