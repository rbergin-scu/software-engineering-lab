import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import Enzyme from 'enzyme';
import faker from 'faker';
import React from 'react';
import { Factory } from 'meteor/dburles:factory';

import Businesses from '/imports/api/businesses/businesses';
import Submissions from './submissions';

// configure React test adapter
Enzyme.configure({adapter: new Adapter()});

Factory.define('submission', Submissions, {
  name: () => faker.name.firstName(),
  email: () => faker.internet.email(),
  phoneNumber: () => faker.phone.phoneNumber(),
  gradYear: () => faker.random.number(),
});

Factory.define('business', Businesses, {
  name: () => faker.company.companyName(),
  desc: () => faker.company.catchPhrase(),
  photo: () => faker.image.imageUrl(),
  type: () => faker.commerce.product(),
  country: () => faker.address.country(),
  streetAddress: () => faker.address.streetAddress(),
  state: () => faker.address.state(),
  city: () => faker.address.city(),
  zip: () => faker.address.zipCode(undefined),
  phoneNumber: () => faker.phone.phoneNumber(),
  website: () => faker.internet.url(),
  verified: false,
});

let expect = chai.expect;

describe('Submissions', () => {
  
  let business;
  
  let submission;
  let submission2;
  let id;
  let id2;
  
  before(() => {
    business = Factory.create('business');
    submission = Factory.create('submission');
    submission2 = Factory.create('submission');
    id = submission._id;
    id2 = submission2._id;
  });
  
  it('should have a name of at most 60 characters', () => {
    expect(submission.name).to.not.be.empty;
    expect(submission.name).to.have.lengthOf.at.most(60);
  });
  
  it('should have an email of at most 60 characters', () => {
    expect(submission.email).to.not.be.empty;
    expect(submission.email).to.have.lengthOf.at.most(60);
  });
  
  it('should be added to the collection', () => {
    Meteor.call('submissions.insert', {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      gradYear: faker.random.number(),
      business: business,
    });
  });
  
  it('should be added to the collection without the optional fields', () => {
    Meteor.call('submissions.insert', {
      name: faker.name.firstName(),
    });
  });
  
  it('should be added to the collection with only some of the optional fields', () => {
    Meteor.call('submissions.insert', {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
    });
  });
  
  it('should be removed from the collection', () => {
    Meteor.call('submissions.remove', {
      _id: id,
    });
  });
  
  it('should update the collection', () => {
    Meteor.call('submissions.update', {
      _id: id,
      name: 'Nani',
      email: submission2.email,
      phoneNumber: submission2.phoneNumber,
      gradYear: submission2.gradYear,
      business: submission2.business,
    });
  });
  
});
