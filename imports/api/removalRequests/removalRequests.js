import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import { Businesses } from '/imports/api/businesses/businesses';

// create submissions table
const RemovalRequests = new Mongo.Collection('removalRequests');

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
    regEx: SimpleSchema.RegEx.Phone,
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

  reason: {
    type: String,
    required: true,
    label: 'Reason for requesting removal'
  }
  
}, {
  
  requiredByDefault: false,
  tracker: Tracker,
  
});
const schemaContext = schema.newContext();
RemovalRequests.schema = schema;

// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('submissions', () => {
    return RemovalRequests.find({});
  });
}

Meteor.methods({
  'removalRequests.validate'(
    removalRequest,
  ) {
    try {
      RemovalRequests.schema.validate(removalRequest);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },
  
  'removalRequests.insert'(
    removalRequest,
  ) {
    // validate input
    RemovalRequests.schema.validate(removalRequest);
    
    // check for duplicate (by name); Shouldn't come up: any duplicated should be caught be Businesses schema
    if (RemovalRequests.findOne({ gradName: removalRequest.gradName, business: removalRequest.business, })) {
      throw new Meteor.Error('removalRequests-found', 'You have already submitted that removal request.');
    } else {
      // submit to database
      const result = RemovalRequests.insert(removalRequest, (err) => {
        if (err) {
          throw new Meteor.Error('removalRequests.insert', err.details);
        }
      });
      
      return RemovalRequests.find({ _id: result }).fetch();
    }
  },
  
  'removalRequests.remove'({
    id,
  }) {
    RemovalRequests.remove({
      _id: id,
    });
  },
});

export default RemovalRequests;
