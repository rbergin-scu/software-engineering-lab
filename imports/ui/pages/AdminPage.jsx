import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Submissions from '/imports/api/submissions/submissions';
import {
  Button, Input, Label,
} from 'reactstrap';

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




  render() {
    console.log(this.props.currentUser);
    if(!Meteor.user()) {
      return (
        <form className="login" id ="login">
          <Label for="password">Password</Label>
          <Input type="password" name="password" placeholder="*****"
                 onChange={ this.handleInput } />
          <Button color="primary" onClick={ this.handleLogin.bind(this) }>Login</Button>
        </form>
      );
    }
    else {
      return (
        <form className="logout">
          <Button color="primary" onClick={ Meteor.logout }>Logout</Button>
        </form>
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

  return {
    submissions: Submissions.find({ }).fetch(),
    currentUser: Meteor.user(),
  };
})(AdminPage);
