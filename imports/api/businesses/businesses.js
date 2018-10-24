import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// create business table
const Businesses = new Mongo.Collection('businesses');

// establish schema defining each business entry
Businesses.schema = new SimpleSchema({
  
  /* title of business */
  name: { type: String },

  /* brief description */
  desc: { type: String },

  /* header photo */
  photo: { type: String },

  /* country (location) */
  country: { type: String },

  /* address of business */
  streetAddress: { type: String },

  /* state (location) */
  state: { type: String, optional: true },

  /* city (location) */
  city: { type: String },

  /* zip (location) */
  zip: { type: String, optional: true },

  /* phone number of business */
  phoneNumber: { type: String, optional: true},

  /* url of website for business */
  website: { type: String, optional: true},

  /* type/category of business (food, entertainment, etc) */
  type: { type: String },

  verified: { type: Boolean , default: false },
  
}, { tracker: Tracker });



// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('businesses', () => {
    return Businesses.find({});
  });
}

// define CRUD methods
Meteor.methods({
  'businesses.insert'({ name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified}) {
    // validate input
    Businesses.schema.validate({ name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified });
    
    // check for duplicate (by name)
    if (Businesses.findOne({ name: name , phoneNumber: phoneNumber})) {
      throw new Meteor.Error('businesses-already-exists', "A business by that name already exists.");
    } else {
      // submit to database
      Businesses.insert({
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
        verified: verified
      });
    }
  },
  
  'businesses.remove'( businessId ) {
  
  },
});

export default Businesses;
