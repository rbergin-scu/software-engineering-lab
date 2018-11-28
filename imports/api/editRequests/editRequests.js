import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import { Businesses } from '/imports/api/businesses/businesses';

/**
 * A database of Edit Requests.
 */
const EditRequests = new Mongo.Collection('editRequests');

/**
 * Define the EditRequests table schema, which also talks to React so forms validate automatically.
 * ------------------
 * gradName   : the submitter's full name
 * gradEmail  : the submitter's email address
 * gradPhone  : the submitter's phone number
 * gradYear   : the submitter's graduation year at SCU
 * businessId : the internal ID for the business that is being considered for removal
 * business   : the business object compiled from the rest of the form fields
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
  /**
   * Attempts to validate the provided object against the EditRequests schema. Expects strictly fields that are provided
   * within the schema (e.g., no Meteor ._id).
   *
   * @param editRequest  The editRequest object to validate.
   * @returns {*}       undefined if there were no validation errors, and the error details otherwise.
   *                    'details' contains objects for each input that failed to validate.
   */
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

  /**
   * Attempts to insert the provided object into the EditRequests collection. Expects a valid object, but still ensures
   * no invalid objects are inserted.
   *
   * @param editRequest  The editRequest object to insert.
   * @returns {*}       If editRequest fails, returns nothing. Otherwise, returns the contents of the newly inserted
   *                    EditRequest.
   */
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

  /**
   * Removes an EditRequest from the index, which should be done upon either editRequest approval or denial.
   *
   * @param id  The editRequest to remove.
   */
  'editRequests.remove'({
    id,
  }) {
    EditRequests.remove({
      _id: id,
    });
  },
});

export default EditRequests;
