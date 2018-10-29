import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import Enzyme from 'enzyme';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';

import Businesses from './businesses';
import Business from '/imports/ui/components/Business';

// configure React test adapter
Enzyme.configure({adapter: new Adapter()});

Factory.define('business', Businesses, {
  name: () => faker.company.companyName(),
  desc: () => faker.company.catchPhrase(),
  photo: () => faker.image.imageUrl(),
  country: () => faker.address.country(),
  streetAddress: () => faker.address.streetAddress(),
  state: () => faker.address.state(),
  city: () => faker.address.city(),
  zip: () => faker.address.zipCode(undefined),
  phoneNumber: () => faker.phone.phoneNumber(),
  website: () => faker.internet.url(),
  type: () => faker.commerce.product(),
  verified: false,
});

let expect = chai.expect;

describe('Businesses', () => {
  
  let business;
  let business2;
  let id;
  let id2;
  
  before(() => {
    business = Factory.create('business');
    business2 = Factory.create('business');
    id = business._id;
    id2 = business2._id;
  });
  
  it('should have a name of at most 60 characters', () => {
    expect(business.name).to.not.be.empty;
    expect(business.name).to.have.lengthOf.at.most(60);
  });
  
  it('should have an alphanumeric description of at most 140 characters', () => {
    expect(business.desc).to.not.be.empty;
    expect(business.desc).to.match(/^.+$/);
    expect(business.desc).to.have.lengthOf.at.most(140);
  });
  
  it('should have a country of at most 60 characters', () => {
    expect(business.country).to.not.be.empty;
    expect(business.country).to.have.lengthOf.at.most(60);
  });
  
  it('should have a streetAddress of at most 60 characters', () => {
    expect(business.streetAddress).to.not.be.empty;
    expect(business.streetAddress).to.have.lengthOf.at.most(60);
  });
  
  it('should have a state of at most 30 characters', () => {
    expect(business.state).to.not.be.empty;
    expect(business.state).to.have.lengthOf.at.most(30);
  });
  
  it('should have a phone number of at most 30 characters', () => {
    expect(business.phoneNumber).to.not.be.empty;
    expect(business.phoneNumber).to.have.lengthOf.at.most(30);
  });
  
  it('should have a webite url of at most 100 characters', () => {
    expect(business.website).to.not.be.empty;
    expect(business.website).to.have.lengthOf.at.most(100);
  });
  
  it('should have a type of at most 30 characters', () => {
    expect(business.type).to.not.be.empty;
    expect(business.type).to.have.lengthOf.at.most(30);
  });
  
  it('should render', () => {
    const item = Enzyme.shallow(<Business name={business.name} desc={business.desc}/>);
    
    expect(item.find(Card)).to.have.lengthOf(1);
    expect(item.find(CardTitle).dive().text()).to.equal(business.name);
    expect(item.find(CardText).dive().text()).to.equal(business.desc);
  });
  
  it('should be added to the collection', () => {
    Meteor.call('businesses.insert', {
      name: faker.company.companyName(),
      desc: faker.company.catchPhrase(),
      photo: faker.image.imageUrl(),
      country: faker.address.country(),
      streetAddress: faker.address.streetAddress(),
      state: faker.address.state(),
      city: faker.address.city(),
      zip: faker.address.zipCode(undefined),
      phoneNumber: faker.phone.phoneNumber(),
      website: faker.internet.url(),
      type: faker.commerce.product(),
      verified: false,
    });
  });
  
  it('should be removed from the collection', () => {
    Meteor.call('businesses.remove', {
      _id: id,
    });
  });
  
  it('should update the collection', () => {
    Meteor.call('businesses.update', {
      _id: id2,
      name: 'NANI!?!?',
      desc: business2.desc,
      photo: business2.photo,
      country: business2.country,
      streetAddress: business2.streetAddress,
      state: business2.state,
      city: business2.city,
      zip: business2.zip,
      phoneNumber: business2.phoneNumber,
      website: business2.website,
      type: business2.type,
      verified: business2.verified,
    });
  });
  
});
