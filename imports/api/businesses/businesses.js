import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// create business table
const Businesses = new Mongo.Collection('businesses');

// establish schema defining each business entry
SimpleSchema.defineValidationErrorTransform(error => {
  const customError = new Meteor.Error(error.message);
  
  customError.details = 'businesses-validate';
  customError.error = '<ul class="mb-0">';
  for (let i = 0; i < error.details.length; i++) {
    customError.error += `<li>${error.details[i].message}</li>`;
  }
  customError.error += '</ul>';
  
  return customError;
});

const schema = new SimpleSchema({
  /* title of business */
  name: {
    type: String,
    max: 70,
    required: true,
  },
  
  /* brief description */
  desc: {
    type: String,
    max: 140,
    required: true,
  },
  
  /* header photo */
  photo: {
    type: String,
  },
  
  /* type/category of business (food, entertainment, etc) */
  category: {
    type: String,
    min: 4,
    required: true,
  },
  
  /* country (location) */
  country: {
    type: String,
    required: true,
  },
  
  /* address (location) */
  streetAddress: {
    type: String,
    required: true,
  },
  
  /* state (location) */
  state: {
    type: String,
    optional: true,
    required: true,
  },
  
  /* city (location) */
  city: {
    type: String,
    required: true,
  },
  
  /* zip (location) */
  zip: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.ZipCode,
  },
  
  /* phone number of business */
  phoneNumber: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Phone,
  },
  
  /* url of website for business */
  website: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  
  /* whether this business has been verified by admin (is public) */
  verified: {
    type: Boolean,
    defaultValue: false,
  },
}, { tracker: Tracker });
const schemaContext = schema.newContext();
Businesses.schema = schema;

// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('businesses', () => {
    return Businesses.find({});
  });
}

// define CRUD methods
Meteor.methods({
  'businesses.insert'({
    name, desc, photo, category, country, streetAddress, state, city, zip, phoneNumber, website, verified,
  }) {
    const item = {
      name: name,
      desc: desc,
      photo: photo,
      category: category,
      country: country,
      streetAddress: streetAddress,
      state: state,
      city: city,
      zip: zip,
      phoneNumber: phoneNumber,
      website: website,
      verified: verified,
    };
    
    // validate input
    Businesses.schema.validate(item);
    
    // check for duplicate (by name and phone match)
    /*if (Businesses.findOne({ name: name, phoneNumber: phoneNumber, })) {
      throw new Meteor.Error('businesses-found', 'A business by that name already exists.');
    } else {
      // submit to database
      Businesses.insert(item, (err) => {
        if (err) {
          throw new Meteor.Error('businesses-insert', err);
        }
      });
    }*/
  },
  
  'businesses.remove'({
    id
  }) {
    Businesses.remove({
      _id: id,
    });
  },
  
  'businesses.update'({
    id, name, desc, photo, category, country, streetAddress, state, city, zip, phoneNumber, website, verified,
  }) {
    // validate update
    Businesses.schema.validate({
      name, desc, photo, category, country, streetAddress, state, city, zip, phoneNumber, website, verified,
    });
    
    // submit to database
    // TODO need to validate that Business with this id exists!
    Businesses.update({ _id: id, }, {
      name: name,
      desc: desc,
      photo: photo,
      category: category,
      country: country,
      streetAddress: streetAddress,
      state: state,
      city: city,
      zip: zip,
      phoneNumber: phoneNumber,
      website: website,
      verified: verified,
    });
  },
});

export default Businesses;
