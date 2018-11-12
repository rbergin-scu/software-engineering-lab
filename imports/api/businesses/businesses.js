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
  food: 'Food',
  entertainment: 'Entertainment',
  service: 'Service',
  manufacturing: 'Manufacturing',
  merchandising: 'Merchandising',
  management: 'Management'
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
  desc: {
    type: String,
    required: true,
    regEx: /(\n|^).*?(?=\n|$)/,
    max: 140,
    label: 'Description',
  },
  
  /* header photo */
  photo: {
    type: String,
    max: 140,
  },
  
  /* type/category of business (food, entertainment, etc) */
  category: {
    type: String,
    required: true,
    allowedValues: Object.keys(Categories),
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
  
  /* state (location) */
  state: {
    type: String,
    regEx: /[A-Z]{2}/,
  },
  
  /* city (location) */
  city: {
    type: String,
    regEx: /[a-zA-Z]{2,}/,
    max: 60,
  },
  
  /* zip (location) */
  zip: {
    type: String,
    regEx: /^\d{5}(?:[-\s]\d{4})?$/,
    label: 'ZIP',
  },
  
  /* phone number of business */
  phoneNumber: {
    type: String,
    regEx: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  },
  
  /* url of website for business */
  website: {
    type: String,
    regEx: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
  },
  
  /* whether this business has been verified by admin (is public) */
  verified: {
    type: Boolean,
    defaultValue: true,
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
  
  Meteor.publish('businesses.public', () => {
    return Businesses.find({ verified: true, });
  })
;}

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
  
  'businesses.remove'({
    id
  }) {
    if (Businesses.findOne({ _id: id, })) {
      Businesses.remove({
        _id: id,
      });
    } else {
      throw new Meteor.Error('businesses.remove: error', 'Could not find a business with that ID.');
    }
  },
  
  'businesses.update'({
    id, name, desc, photo, category, country, streetAddress, state, city, zip, phoneNumber, website, verified,
  }) {
    let item = {
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
    
    // validate input proposed for update
    Businesses.schema.validate(item);

    // look for direct match in ID
    let target;
    if (target = Businesses.findOne({ _id: id, })) {
      // fill empty values with existing values for convenience to user
      Object.keys(item).forEach((key) => {
        if (key.equals('')) {
          item[key] = target[key];
        }
      });
      
      // update if found
      Businesses.update({ _id: id, }, {
        name: item.name,
        desc: item.desc,
        photo: item.photo,
        category: item.category,
        country: item.country,
        streetAddress: item.streetAddress,
        state: item.state,
        city: item.city,
        zip: item.zip,
        phoneNumber: item.phoneNumber,
        website: item.website,
        verified: item.verified,
      });
    }
  },
});

export {
  Businesses,
  Categories,
};
