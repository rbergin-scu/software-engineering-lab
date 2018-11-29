import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Businesses } from '/imports/api/businesses/businesses';
import '/imports/api/photos/photos';
import Submissions from '/imports/api/submissions/submissions';

/**
 * Handles everything necessary on startup, as well as ensures the admin account exists.
 */
Meteor.startup(() => {
  
  /* publish all businesses (index.jsx) */
  Meteor.publish('businesses.all', () => Businesses.find());
  
  /* publish one business (business.jsx) */
  Meteor.publish('businesses.one', (id) => Businesses.find({ _id: id }));
  
  /* publish all submissions (admin) */
  Meteor.publish('submissions.all', () => Submissions.find());

  // insert admin account if there is none
  if (!Meteor.users.findOne({ username: 'admin' })) {
    Accounts.createUser({
      username: 'admin',
      password: '12345'
    });
  }
  
});
