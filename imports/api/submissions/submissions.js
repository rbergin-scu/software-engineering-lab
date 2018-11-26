import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

import { Businesses } from '/imports/api/businesses/businesses';

/**
 * A database of Submissions.
 */
const Submissions = new Mongo.Collection('submissions');

/**
 * Define the Submission table schema, which also talks to React so forms validate automatically.
 * --------------
 * gradName   : the submitter's full name
 * gradEmail  : the submitter's email address
 * gradPhone  : the submitter's phone number
 * gradYear   : the submitter's graduation year at SCU
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
  
  /* reference to business in table */
  business: {
    type: Businesses.schema,
    required: true,
  },
  
}, {
  
  requiredByDefault: false,
  tracker: Tracker,
  
});
Submissions.schema = schema;

/* define CRUD-like methods */
Meteor.methods({
  
  /**
   * Attempts to validate the provided object against the Submission schema. Expects strictly fields that are provided
   * within the schema (e.g., no Meteor ._id).
   *
   * @param submission  The submission object to validate.
   * @returns {*}       undefined if there were no validation errors, and the error details otherwise.
   *                    'details' contains objects for each input that failed to validate.
   */
  'submissions.validate'(submission) {
    try {
      Submissions.schema.validate(submission);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },
  
  /**
   * Attempts to insert the provided object into the Submissions collection. Expects a valid object, but still ensures
   * no invalid objects are inserted.
   *
   * @param submission  The submission object to insert.
   * @returns {*}       If submission fails, returns nothing. Otherwise, returns the contents of the newly inserted
   *                    Submission.
   */
  'submissions.insert'(submission) {
    try {
      Submissions.schema.validate(submission);
    } catch (e) {
      throw new Meteor.Error('submissions.insert', `The provided submission failed to validate. { ${submission} }`);
    }
    
    // check for duplicate (by submitter's full name and business name)
    if (Submissions.findOne({ gradName: submission.gradName, business: submission.business, })) {
      throw new Meteor.Error('submissions.insert', 'You already submitted a business by that name.');
    } else {
      const result = Submissions.insert(submission, (err, res) => {
        if (err) {
          throw new Meteor.Error('submissions.insert', `Submission could not be inserted. { ${err.details} }`);
        }
      });
      
      return Submissions.find({ _id: result }).fetch();
    }
  },
  
  /**
   * Removes a Submission from the index, which should be done upon either Submission approval or denial.
   *
   * @param id  The submission to remove.
   */
  'submissions.remove'(id) {
    if (Submissions.find({ _id: id })) {
      Submissions.remove({ _id: id }, (err, res) => console.log(`submissions.remove: success => ${res}`));
    } else {
      throw new Meteor.Error('submissions.remove', `Could not find submission to remove. { id: ${id} }`);
    }
  },
  
});

export default Submissions;
