import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import Businesses from '/imports/api/businesses/businesses';

// create submissions table
const Submissions = new Mongo.Collection('submissions');

Submissions.schema = new SimpleSchema({
  /* name of submitter */
  name: {
    type: String,
    min: 1,
  },
  
  /* email of submitter */
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
  },
  
  /* phone number of submitter */
  phoneNumber: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Phone,
  },
  
  /* graduation year */
  gradYear: {
    type: Number,
    optional: true,
    min: 1900,
  },
  
  /* reference to business in table */
  business: {
    type: Businesses.schema,
  },
}, { tracker: Tracker });

// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('submissions', () => {
    return Submissions.find({});
  });
}

Meteor.methods({
  'submissions.insert'({
    name, email, phoneNumber, gradYear, business,
  }) {
    // validate input
    Submissions.schema.validate({
      name, email, phoneNumber, gradYear, business,
    });
    
    // check for duplicate (by name); Shouldn't come up: any duplicated should be caught be Businesses schema
    if (Submissions.findOne({ name: name, business: business, })) {
      throw new Meteor.Error('submission-already-exists', 'A submission by that name already exists.');
    } else {
      // submit to database
      Submissions.insert({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        gradYear: gradYear,
        business: business,
      });
    }
  },
  
  'submissions.remove'({
    id,
  }) {
    Submissions.remove({
      _id: id,
    });
  },
  
  'submissions.update'({
    id, name, email, phoneNumber, gradYear, business,
  }) {
    // validate update
    Submissions.schema.validate({
      id, name, email, phoneNumber, gradYear,
    });
    
    // submit to database
    Submissions.update({ _id: id }, {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      gradYear: gradYear,
      business: business,
    });
  },
});

export default Submissions;
