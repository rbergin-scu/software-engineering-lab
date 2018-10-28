import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// create business table
const Businesses = new Mongo.Collection('businesses');

// establish schema defining each business entry
Businesses.schema = new SimpleSchema({
  /* title of business */
  name: {
    type: String,
    min: 1,
    max: 70,
  },
  
  /* brief description */
  desc: {
    type: String,
    min: 1,
    max: 140,
  },
  
  /* header photo */
  photo: {
    type: String,
  },
  
  /* type/category of business (food, entertainment, etc) */
  type: {
    type: String,
    min: 4,
  },
  
  /* whether this business has been verified by admin (is public) */
  verified: {
    type: Boolean,
    defaultValue: false,
  },
  
  /* country (location) */
  country: {
    type: String,
    min: 4,
  },
  
  /* address of business */
  streetAddress: {
    type: String,
    min: 1,
  },
  
  /* state (location) */
  state: {
    type: String,
    optional: true,
    min: 2,
  },
  
  /* city (location) */
  city: {
    type: String,
    min: 1,
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
}, { tracker: Tracker });

// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('businesses', () => {
    return Businesses.find({});
  });
}

// define CRUD methods
Meteor.methods({
  'businesses.insert'({
    name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified,
  }) {
    // validate input
    Businesses.schema.validate({
      name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified,
    });
    
    // check for duplicate (by name and phone match)
    if (Businesses.findOne({ name: name, phoneNumber: phoneNumber, })) {
      throw new Meteor.Error('businesses-already-exists', 'A business by that name already exists.');
    } else {
      // submit to database
      return Businesses.insert({
        name: name,
        desc: desc,
        photo: photo,
        country: country,
        streetAddress: streetAddress,
        state: state,
        city: city,
        zip: zip,
        phoneNumber: phoneNumber,
        website: website,
        type: type,
        verified: verified,
      });
    }
  },
  
  'businesses.remove'({
    id
  }) {
    Businesses.remove({
      _id: id,
    });
  },
  
  'businesses.update'({
    id, name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified,
  }) {
    // validate update
    Businesses.schema.validate({
      name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified,
    });
    
    // submit to database
    // TODO need to validate that Business with this id exists!
    Businesses.update({ _id: id, }, {
      name: name,
      desc: desc,
      photo: photo,
      country: country,
      streetAddress: streetAddress,
      state: state,
      city: city,
      zip: zip,
      phoneNumber: phoneNumber,
      website: website,
      type: type,
      verified: verified,
    });
  },
});

export default Businesses;
