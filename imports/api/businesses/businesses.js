import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Businesses = new Mongo.Collection('businesses');

Businesses.schema = new SimpleSchema({
  name: { type: String },
  desc: { type: String },
});

Businesses.insert({
  name: 'Test Biz',
  desc: 'An example business.',
});

export default Businesses;
