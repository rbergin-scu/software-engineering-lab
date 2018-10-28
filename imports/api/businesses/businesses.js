import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import Submissions from "../submissions/submissions";

// create business table
const Businesses = new Mongo.Collection('businesses');

// establish schema defining each business entry
Businesses.schema = new SimpleSchema({
  
  /* title of business */
  name: { type: String, min: 1 },

  /* brief description */
  desc: { type: String, min: 1 },

  /* header photo */
  photo: { type: String },

  /* country (location) */
  country: { type: String, min: 4 },

  /* address of business */
  streetAddress: { type: String, min: 1 },

  /* state (location) */
  state: { type: String, optional: true, min: 2 },

  /* city (location) */
  city: { type: String, min: 1 },

  /* zip (location) */
  zip: { type: String, optional: true, regEx: SimpleSchema.RegEx.ZipCode },

  /* phone number of business */
  phoneNumber: { type: String, optional: true },

  /* url of website for business */
  website: { type: String, optional: true, regEx: SimpleSchema.RegEx.Url },

  /* type/category of business (food, entertainment, etc) */
  type: { type: String, min: 4 },

  verified: { type: Boolean, defaultValue: false },
  
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
    
    // check for duplicate (by name)
    if (Businesses.findOne({ name: name, phoneNumber: phoneNumber, })) {
      throw new Meteor.Error('businesses-already-exists', 'A business by that name already exists.');
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
        verified: verified,
      });
    }
  },

    'businesses.remove'({ businessID }) {
        Businesses.remove({
            _id: businessID
        });
    },

    'businesses.update'({
    name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified, businessID
    }) {
        // validate update
        Businesses.schema.validate({
            name, desc, photo, country, streetAddress, state, city, zip, phoneNumber, website, type, verified,
        });
        // submit to database
        Businesses.update({_id: businessID }, {
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
