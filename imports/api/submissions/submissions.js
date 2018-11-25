import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import { Businesses } from '/imports/api/businesses/businesses';

// create submissions table
const Submissions = new Mongo.Collection('submissions');

const schema = new SimpleSchema({
  /* name of submitter */
  gradName: {
    type: String,
    required: true,
    label: 'Your name',
  },
  
  /* email of submitter */
  gradEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'Email address',
  },
  
  /* phone number of submitter */
  gradPhone: {
    type: String,
    regEx: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    label: 'Phone number',
  },
  
  /* graduation year */
  gradYear: {
    type: Number,
    required: true,
    min: 1900,
    label: 'Graduation year',
  },
  
  /* reference to business in table */
  business: {
    type: Businesses.schema,
    required: true,
  },
}, {
  requiredByDefault: false,
  tracker: Tracker,
});
const schemaContext = schema.newContext();
Submissions.schema = schema;

// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('submissions', () => {
    return Submissions.find({});
  });
}

Meteor.methods({
  'submissions.validate'(
    submission,
  ) {
    try {
      Submissions.schema.validate(submission);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },
  
  'submissions.insert'(
    submission,
  ) {
    // validate input
    Submissions.schema.validate(submission);
    
    // check for duplicate (by name); Shouldn't come up: any duplicated should be caught be Businesses schema
    if (Submissions.findOne({ gradName: submission.gradName, business: submission.business, })) {
      throw new Meteor.Error('submissions-found', 'You have already submitted that business.');
    } else {
      // submit to database
      const result = Submissions.insert(submission, (err) => {
        if (err) {
          throw new Meteor.Error('submissions.insert', err.details);
        }
      });
      
      return Submissions.find({ _id: result }).fetch();
    }
  },
  
  'submissions.remove'({
    id,
  }) {
    Submissions.remove({
      _id: id,
    });
  },
});

export default Submissions;
