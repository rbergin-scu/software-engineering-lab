import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// create submissions table
const Submissions = new Mongo.Collection('submissions');

Submissions.schema = new SimpleSchema({

  /* name of submitter */
  name: { type: String },

  /* email of submitter */
  email: { type: String , optional: true },

  /* phone number of submitter */
  phoneNumber: { type: String , optional: true },

  /* graduation year */
  gradYear: { type: Number , optional: true },

  /* reference to business in table */
  businessID: { type: Number },

}, { tracker: Tracker });

// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('submissions', () => {
    return Submissions.find({});
  });
}

Meteor.methods({
  'submissions.insert'({
    name, email, phoneNumber, gradYear, businessID,
  }) {
    // validate input
    Submissions.schema.validate({
        name, email, phoneNumber, gradYear, businessID,
    });

      // check for duplicate (by name); Shouldn't come up: any duplicated should be caught be Businesses schema
      if (Submissions.findOne({ name: name, businessID: businessID, })) {
          throw new Meteor.Error('submission-already-exists', 'A submission by that name already exists.');
      } else {
          // submit to database
          Submissions.insert({
              name: name,
              email: email,
              phoneNumber: phoneNumber,
              gradYear: gradYear,
              businessID: businessID,
          });
      }
  },

  'submissions.remove'( submissionID ) {
      Submissions.remove({
          _id: submissionID,
      });
  },
});

export default Submissions;
