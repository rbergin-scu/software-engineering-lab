import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Submissions from '/imports/api/submissions/submissions';
import {
  Button, Input, Label,
} from 'reactstrap';

import '../imports/startup/server/accounts-config.js';

import Error from './components/Error';
import Businesses from "../../api/businesses/businesses";

class AdminPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: '',
      modal: false,
      password: null,
    };

    this.error = this.error.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
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

    Meteor.call('accounts.login', {
      password: this.state.submission.password,
    }, (err, res) => {
      if (err) {
        this.error(err);
      } else {
        console.log(res);
        this.toggle();
      }
    });
  }

  render() {
    if (Meteor.user() == null) {
      return (
        <div>
          <form class="login">
          <Label for="password">Password</Label>
          <Input type="password" name="password" placeholder="*****"
                 onChange={this.handleInput}/>
          <Button color="primary" onClick={this.handleSubmit.bind(this)}>Login</Button>
          </form>
        </div>
      );
    }
    else {
      return (
        //TODO create admin view here
        <div>
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

  return {
    submissions: Submissions.find({ }).fetch(),
  };
})(AdminPage);
