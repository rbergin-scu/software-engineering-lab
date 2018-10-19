import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// create business "table"
export const Businesses = new Mongo.Collection('businesses');

// establish schema defining each business entry
Businesses.schema = new SimpleSchema({
  /* title of business */
  name: { type: String },

  /* brief description */
  desc: { type: String },
});

if (Meteor.isServer) {
  /* publish database info to React */
  Meteor.publish('businesses', function businessesPublication() {
    return Businesses.find({});
  });
}

export default Businesses;
