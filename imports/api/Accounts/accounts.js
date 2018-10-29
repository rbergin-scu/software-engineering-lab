import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

//method to create our admin account
Meteor.methods({
  'accounts.adminAccount' ({}) {
    Accounts.createUser({
      username: "admin",
      password: "12345",
    });
  },

  'accounts.login' ({ password }) {
    Accounts.loginWithPassword({
      username: "admin",
      password: password,
    });
  },
});




