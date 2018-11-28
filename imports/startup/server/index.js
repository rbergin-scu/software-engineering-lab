import { Meteor } from 'meteor/meteor';

import { Accounts } from 'meteor/accounts-base';
import { Businesses } from '/imports/api/businesses/businesses';
import Photos from '/imports/api/photos/photos';
import Submissions from '/imports/api/submissions/submissions';

Meteor.startup(() => {
  
  /* publish all businesses (index) */
  Meteor.publish('businesses.all', () => Businesses.find());
  
  /* publish all submissions (admin) */
  Meteor.publish('submissions.all', () => Submissions.find());
  
  // insert test data if there's nothing
  if (!Businesses.findOne()) {
    Businesses.insert({
      name: 'Krusty Krab',
      description: 'This is your world. In your world you have total and absolute power. Trees get lonely too, so we\'ll give him a little friend.',
      category: 'food',
      phoneNumber: '1234567890',
      website: 'www.scu.edu',
      streetAddress: '111 Conch St',
      city: 'Bikini Bottom',
      state: 'OR',
      zip: '97068',
    });
  }

  // insert admin account if there is none
  if (!Meteor.users.findOne({ username: 'admin' })) {
    Accounts.createUser({
      username: 'admin',
      password: '12345'
    });
  }
  
});
