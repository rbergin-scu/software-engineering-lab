import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';

/**
 * A database of Businesses.
 */
const Businesses = new Mongo.Collection('businesses');

/**
 * Allowed values for Business.category, which are generic categories used to make searching easier.
 */
const Categories = {
  entertainment: 'Entertainment',
  food: 'Food',
};

/**
 * Define the Business table schema, which also talks to React so forms validate automatically.
 * ------------------
 * name           : the title of the business
 * description    : a brief (< 140 chars) description of the business
 * category       : the category that most accurately describes this business
 * photo          : the URL to a photo of the establishment, if one has been provided
 * phoneNumber    : ...
 * website        : ...
 * country        : ...
 * streetAddress  : ...
 * city           : ...
 * state          : ...
 * zip            : ...
 * -----------------
 */
const schema = new SimpleSchema({
  
  /* title of business */
  name: {
    type: String,
    required: true,
    regEx: /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!\-":;,]{2,}$/,
    max: 60,
    label: 'Business name',
  },
  
  /* brief description */
  description: {
    type: String,
    required: true,
    regEx: /(\n|^).*?(?=\n|$)/,
    max: 140,
  },
  
  /* type/category of business (food, entertainment, etc) */
  category: {
    type: String,
    required: true,
    allowedValues: Object.keys(Categories),
  },
  
  /* header photo */
  photo: {
    type: String,
    max: 140,
  },
  
  /* phone number of business */
  phoneNumber: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
  },
  
  /* url of website for business */
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Domain,
  },
  
  /* country (location) */
  country: {
    type: String,
    regEx: /^[a-zA-Z_ ]*$/,
    max: 60,
    defaultValue: 'United States',
  },
  
  /* address (location) */
  streetAddress: {
    type: String,
    regEx: /^\s*\S+(?:\s+\S+){2}/,
    max: 60,
  },
  
  /* city (location) */
  city: {
    type: String,
    regEx: /[a-zA-Z]{2,}/,
    max: 60,
  },
  
  /* state (location) */
  state: {
    type: String,
    regEx: /[A-Z]{2}/,
  },
  
  /* zip (location) */
  zip: {
    type: String,
    regEx: SimpleSchema.RegEx.ZipCode,
    label: 'ZIP',
  },
  
}, {
  
  requiredByDefault: false,
  tracker: Tracker,
  
});
Businesses.schema = schema;

/* define CRUD-like methods */
Meteor.methods({
  
  /**
   * Attempts to validate the provided object against the Business schema. Expects strictly fields that are provided
   * within the schema (e.g., no Meteor ._id).
   *
   * @param business  The business object to validate.
   * @returns {*}     undefined if there were no validation errors, and the error details otherwise.
   *                  'details' contains objects for each input that failed to validate.
   */
  'businesses.validate'(business) {
    try {
      Businesses.schema.validate(business);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },
  
  /**
   * Attempts to insert the provided object into the Businesses collection. Expects a valid object, but still ensures
   * no invalid objects are inserted.
   *
   * @param business  The business object to insert.
   */
  'businesses.insert'(business) {
    try {
      Businesses.schema.validate(business);
    } catch (e) {
      throw new Meteor.Error('businesses.insert', `The provided business failed to validate. { ${business} }`);
    }
    
    // sanity check for duplicate (by name and phone number match)
    if (Businesses.findOne({ name: business.name, phoneNumber: business.phoneNumber, })) {
      throw new Meteor.Error('businesses.insert',
        `An existing business matches the provided info. { name: ${business.name}, phone: ${business.phoneNumber} }`);
    } else {
      // TODO prevent this unless user is signed in as admin
      Businesses.insert(business, (err, res) => {
        if (err) {
          throw new Meteor.Error('businesses.insert', err);
        } else {
          console.log(`businesses.insert: success => ${res}`);
        }
      });
    }
  },
  
  /**
   * Removes a Business from the public index.
   *
   * @param id  Target business ID.
   */
  'businesses.remove'(id) {
    if (Businesses.find({ _id: id })) {
      Businesses.remove({ _id: id }, (err, res) => console.log(`businesses.remove: success => ${res}`));
    } else {
      throw new Meteor.Error('businesses.remove', `Could not find business to remove. { id: ${id} }`);
    }
  },
  
  /**
   * Replaces some field(s) in an existing business.
   *
   * @param id        Target business ID.
   * @param business  The updated contents, which are assumed to be exhaustive (e.g. all properties are set).
   */
  'businesses.update'(id, business) {
    if (Businesses.find({ _id: id })) {
      Businesses.update({ _id: id }, business, (err, res) => console.log(`businesses.update: success => ${res}`));
    } else {
      throw new
        Meteor.Error('businesses.update', `Could not find business to update. { id: ${id}, business: ${business} }`);
    }
  },
  
});

export {
  Businesses,
  Categories,
};
