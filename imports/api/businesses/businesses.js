import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker'
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
  service: 'Service',
  manufacturing: 'Manufacturing',
  merchandising: 'Merchandising',
  management: 'Management',
  food: 'Food',
};

/**
 * Allowed values for Business.state, which are just states in the U.S.
 */
const USStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
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
    allowedValues: Object.keys(USStates),
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
Businesses.attachSchema(schema);

/* define CRUD-like methods */
Meteor.methods({
  
  /**
   * Attempts to validate the provided object against the Business schema. Expects strictly fields that are provided
   * within the schema (e.g., no Meteor ._id).
   *
   * @param business  The business object to validate.
   * @returns {*}     undefined if there were no errors; an array of all fields which contained errors otherwise,
   *                  which includes specific references to SimpleSchema expectations.
   */
  'businesses.validate'(business) {
    try {
      Businesses.simpleSchema().validate(business);
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
      Businesses.simpleSchema().validate(business);
    } catch (e) {
      throw new Meteor.Error('businesses.insert', `Failed to validate ${JSON.stringify(business)} => ${e}`);
    }
    
    // sanity check for duplicate (by name and phone number match)
    if (Businesses.findOne({ name: business.name, phoneNumber: business.phoneNumber, })) {
      throw new Meteor.Error('businesses.insert',
        `An existing business matches the provided info. { name: ${business.name}, phone: ${business.phoneNumber} }`);
    } else {
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
  'businesses.remove'({
    id,
  }) {
    if (Businesses.find({ _id: id, )) {
      Businesses.remove( id, (err, res) => console.log(`businesses.remove: success => ${res}`));
    } else {
      throw new Meteor.Error('businesses.remove', 'Could not remove business with that ID.');
    }
  },


  'businesses.removeRequest'(
    id,
  ) {
    if (Businesses.find({ _id: id.id, })) {
      Businesses.remove({ _id: id.id, });
    } else {
      throw new Meteor.Error('businesses.remove: error', 'Could not find a business with that ID.');
    }
  },
  
  /**
   * Replaces some field(s) in an existing business.
   *
   * @param id        Target business ID.
   * @param business  The updated contents, which do not need to be exhaustive.
   */
  'businesses.update'(id, business) {
    // create a copy ready for MongoDB, includes references to fields which may not be set by this update (necessary)
    let item = { $set: {
        name: business.name,
        description: business.description,
        category: business.category,
        photo: business.photo,
        phoneNumber: business.phoneNumber,
        website: business.website,
        country: business.country,
        streetAddress: business.streetAddress,
        city: business.city,
        state: business.state,
        zip: business.zip,
      }
    };
    
    if (Businesses.find({ _id: id })) {
      Businesses.update({ _id: id }, item, (err, res) => console.log(`businesses.update: success => ${res}`));
    } else {
      throw new Meteor.Error('businesses.update', 'Could not find a business to update with that ID.');
    }
  },
});

export {
  Businesses,
  Categories,
  USStates,
};
