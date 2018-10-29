import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import Businesses from '/imports/api/businesses/businesses';

// create submissions table
const Submissions = new Mongo.Collection('submissions');

const schema = new SimpleSchema({
  /* name of submitter */
  name: {
    type: String,
    required: true,
    label: 'Full name',
  },
  
  /* email of submitter */
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  
  /* phone number of submitter */
  phoneNumber: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
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
  'submissions.insert'({
    name, email, phoneNumber, gradYear, business,
  }) {
    const item = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      gradYear: gradYear,
      business: business,
    };
    
    // validate input
    Submissions.schema.validate(item);
    
    // check for duplicate (by name); Shouldn't come up: any duplicated should be caught be Businesses schema
    if (Submissions.findOne({ name: item.name, business: item.business, })) {
      throw new Meteor.Error('submissions-found', 'You have already submitted that business.');
    } else {
      // submit to database
      Submissions.insert(item, (err, res) => {
        if (err) {
          throw new Meteor.Error('submissions-insert', err.details);
        }
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

    if (Submissions.findOne({ _id: id, })) {
      if(!name) {
        name = this.name;
      }
      if(!email) {
        email = this.name;
      }
      if(!phoneNumber) {
        phoneNumber = this.name;
      }
      if(!gradYear) {
        gradYear = this.name;
      }
    }
    
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
