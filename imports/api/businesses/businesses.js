import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// create business table
const Businesses = new Mongo.Collection('businesses');

const schema = new SimpleSchema({
  /* title of business */
  name: {
    type: String,
    required: true,
    max: 70,
    label: 'Business title',
  },
  
  /* brief description */
  desc: {
    type: String,
    required: true,
    max: 140,
    label: 'Description',
  },
  
  /* header photo */
  photo: {
    type: String,
  },
  
  /* type/category of business (food, entertainment, etc) */
  category: {
    type: String,
    required: true,
    min: 4,
  },
  
  /* country (location) */
  country: {
    type: String,
    defaultValue: 'United States',
  },
  
  /* address (location) */
  streetAddress: {
    type: String,
  },
  
  /* state (location) */
  state: {
    type: String,
  },
  
  /* city (location) */
  city: {
    type: String,
  },
  
  /* zip (location) */
  zip: {
    type: String,
    regEx: SimpleSchema.RegEx.ZipCode,
    label: 'ZIP',
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
    if (Businesses.findOne({ name: name, phoneNumber: phoneNumber, })) {
      throw new Meteor.Error('businesses-found', 'That business already exists.');
    } else {
      // submit to database
      // TODO prevent this unless user is signed in as admin
      Businesses.insert(item, (err, res) => {
        if (err) {
          throw new Meteor.Error('businesses-insert', err);
        }
        console.log(res);
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
    id, name, desc, photo, category, country, streetAddress, state, city, zip, phoneNumber, website, verified,
  }) {
    // validate update
    Businesses.schema.validate({
      name, desc, photo, category, country, streetAddress, state, city, zip, phoneNumber, website, verified,
    });

    if (Businesses.findOne({ _id: id, })) {
      if(!name) {
        name = this.name;
      }
      if(!desc) {
        desc = this.name;
      }
      if(!photo) {
        photo = this.name;
      }
      if(!category) {
        category = this.name;
      }
      if(!streetAddress) {
        streetAddress = this.name;
      }
      if(!country) {
        country = this.name;
      }
      if(!state) {
        state = this.name;
      }
      if(!city) {
        city = this.name;
      }
      if(!zip) {
        zip = this.name;
      }
      if(!phoneNumber) {
        phoneNumber = this.name;
      }
      if(!website) {
        website = this.name;
      }
      if(!category) {
        category = this.name;
      }
    }

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
      verified: this.verified,
    });
  },
});

export default Businesses;
