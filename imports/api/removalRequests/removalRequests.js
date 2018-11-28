import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import { Businesses } from '/imports/api/businesses/businesses';

/**
 * A database of Removal Requests.
 */
const RemovalRequests = new Mongo.Collection('removalRequests');

/**
 * Define the RemovalRequests table schema, which also talks to React so forms validate automatically.
 * ------------------
 * gradName   : the submitter's full name
 * gradEmail  : the submitter's email address
 * gradPhone  : the submitter's phone number
 * gradYear   : the submitter's graduation year at SCU
 * businessId : the internal ID for the business that is being considered for removal
 * business   : the business object compiled from the rest of the form fields
 * reason     : the given reason for why this business should be removed
 * -------------
 */
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

  /* business Id */
  businessId: {
    type: String,
    required: true,
    label: 'Business Id',
  },
  
  /* reference to business in table */
  business: {
    type: Businesses.schema,
    required: true,
  },

  reason: {
    type: String,
    required: true,
    regEx: /(\n|^).*?(?=\n|$)/,
    max: 140,
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
  Meteor.publish('removalRequests', () => {
    return RemovalRequests.find({});
  });
}

Meteor.methods({
  /**
   * Attempts to validate the provided object against the RemovalRequests schema. Expects strictly fields that are provided
   * within the schema (e.g., no Meteor ._id).
   *
   * @param removalRequest  The removalRequest object to validate.
   * @returns {*}       undefined if there were no validation errors, and the error details otherwise.
   *                    'details' contains objects for each input that failed to validate.
   */
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

  /**
   * Attempts to insert the provided object into the RemovalRequests collection. Expects a valid object, but still ensures
   * no invalid objects are inserted.
   *
   * @param removalRequest  The removalRequest object to insert.
   * @returns {*}       If removalRequest fails, returns nothing. Otherwise, returns the contents of the newly inserted
   *                    RemovalRequest.
   */
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

  /**
   * Removes an RemovalRequest from the index, which should be done upon either RemovalRequest approval or denial.
   *
   * @param id  The removalRequest to remove.
   */
  'removalRequests.remove'({
    id,
  }) {
    RemovalRequests.remove({
      _id: id,
    });
  },
});

export default RemovalRequests;
