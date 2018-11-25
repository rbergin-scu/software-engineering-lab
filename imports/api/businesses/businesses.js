import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/*
  create Business collection
 */
const Businesses = new Mongo.Collection('businesses');

/*
  define Business Category possible values
 */
const Categories = {
  entertainment: 'Entertainment',
  food: 'Food',
};

/*
  define Business schema
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
const schemaContext = schema.newContext();
Businesses.schema = schema;

/*
  publish Business data to client
 */
if (Meteor.isServer) {
  Meteor.publish('businesses', () => {
    return Businesses.find({ /* TODO: if (!loggedIn) verified: true */ });
  });
  
  Meteor.publish('businesses.find', ( id ) => {
    return Businesses.find({ _id: id, });
  });
  
  Meteor.publish('businesses.public', () => {
    return Businesses.find({ });
  });
;}

// define CRUD methods
Meteor.methods({
  'businesses.insert'({
    name, description, photo, category, country, streetAddress, state, city, zip, phoneNumber, website,
  }) {
    const item = {
      name: name,
      description: description,
      photo: photo,
      category: category,
      country: country,
      streetAddress: streetAddress,
      state: state,
      city: city,
      zip: zip,
      phoneNumber: phoneNumber,
      website: website,
    };
    
    // validate input
    Businesses.schema.validate(item);
    
    // check for duplicate (by name and phone match)
    if (Businesses.findOne({ name: name, phoneNumber: phoneNumber, })) {
      throw new Meteor.Error('businesses.insert: error', 'That business already exists.');
    } else {
      // submit to database
      // TODO prevent this unless user is signed in as admin
      
      Businesses.insert(item, (err, result) => {
        if (err) {
          throw new Meteor.Error('businesses.insert: error', err);
        } else {
          console.log(`businesses.insert: success (${result})`);
        }
      });
    }
  },
  
  'businesses.remove'(
    id,
  ) {
    if (Businesses.find({ _id: id, })) {
      Businesses.remove({ _id: id, });
    } else {
      throw new Meteor.Error('businesses.remove: error', 'Could not find a business with that ID.');
    }
  },
  
  'businesses.update'(
    business,
  ) {
    let item = {
      name: business.name,
      description: business.description,
      photo: business.photo,
      category: business.category,
      country: business.country,
      streetAddress: business.streetAddress,
      state: business.state,
      city: business.city,
      zip: business.zip,
      phoneNumber: business.phoneNumber,
      website: business.website,
    };
    
    // validate input proposed for update
    Businesses.schema.validate(item);

    // look for direct match in ID
    let target;
    if (target = Businesses.find({ _id: business._id, })) {
      // update if found
      Businesses.update({ _id: business._id, }, item);
    }
  },
});

export {
  Businesses,
  Categories,
};
