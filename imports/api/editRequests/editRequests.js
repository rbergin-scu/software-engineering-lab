import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import { Businesses } from '/imports/api/businesses/businesses';

// create submissions table
const EditRequests = new Mongo.Collection('editRequests');

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
  
}, {
  
  requiredByDefault: false,
  tracker: Tracker,
  
});
const schemaContext = schema.newContext();
EditRequests.schema = schema;

// publish EditRequests data to client
if (Meteor.isServer) {
  Meteor.publish('editRequests', () => {
    return EditRequests.find({});
  });
}

Meteor.methods({
  'editRequests.validate'(
    editRequest,
  ) {
    try {
      EditRequests.schema.validate(editRequest);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },
  
  'editRequests.insert'(
    editRequest,
  ) {
    // validate input
    EditRequests.schema.validate(editRequest);
    
    // check for duplicate (by name); Shouldn't come up: any duplicated should be caught be Businesses schema
    if (EditRequests.findOne({ gradName: editRequest.gradName, business: editRequest.business, })) {
      throw new Meteor.Error('editRequests-found', 'You have already submitted that edit request.');
    } else {
      // submit to database
      const result = EditRequests.insert(editRequest, (err) => {
        if (err) {
          throw new Meteor.Error('editRequests.insert', err.details);
        }
      });
      
      return EditRequests.find({ _id: result }).fetch();
    }
  },
  
  'edits.remove'({
    id,
  }) {
    EditRequests.remove({
      _id: id,
    });
  },
});

export default EditRequests;
