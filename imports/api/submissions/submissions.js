import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import Businesses from "../businesses/businesses";

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
  gradYear: { type: String , optional: true },

  /* reference to business in table */
  businessID: { type: business},

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

      // check for duplicate (by name)
      if (Businesses.findOne({ name: name, phoneNumber: phoneNumber, })) {
          throw new Meteor.Error('businesses-already-exists', 'A business by that name already exists.');
      } else {
          // submit to database
          Businesses.insert({
              name: name,
              desc: desc,
              photo: photo,
              country: country,
              streetAddress: streetAddress,
              state: state,
              city: city,
              zip: zip,
              phoneNumber: phoneNumber,
              website: website,
              type: type,
              verified: verified,
          });
      }
  },

  'submissions.remove'( submissionId ) {

  },
});

export default Submissions;
