import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// create business "table"
const Businesses = new Mongo.Collection('businesses');

// establish schema defining each business entry
Businesses.schema = new SimpleSchema({
  
  /* title of business */
  name: { type: String },

  /* brief description */
  desc: { type: String },

  /* header photo */
  photo: { type: String },
  
}, { tracker: Tracker });

// publish Business data to client
if (Meteor.isServer) {
  Meteor.publish('businesses', () => {
    return Businesses.find({});
  });
}

// define CRUD methods
Meteor.methods({
  'businesses.insert'({ name, desc, photo }) {
    // validate input
    Businesses.schema.validate({ name, desc, photo });
    
    // check for duplicate (by name)
    if (Businesses.findOne({ name: name })) {
      throw new Meteor.Error('businesses-already-exists', "A business by that name already exists.");
    } else {
      // submit to database
      Businesses.insert({
        name: name,
        desc: desc,
        photo: photo,
      });
    }
  },
  
  'businesses.remove'( businessId ) {
  
  }
});

export default Businesses;
