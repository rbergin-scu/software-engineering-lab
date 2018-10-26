import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import Enzyme from 'enzyme';
import faker from 'faker';
import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';
import { Factory } from 'meteor/dburles:factory';

import Businesses from './businesses';
import Business from '/imports/ui/components/Business';

// configure React test adapter
Enzyme.configure({ adapter: new Adapter() });

Meteor.methods({
  /* clear stub data */
  'test.restoreDatabase': () => StubCollections.restore(),
  
  /* generate stub data */
  'test.stubDatabase': () => StubCollections.stub(['businesses']),
});

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
  
  before(() => {
    business = Factory.create('business');
  });

  it('should have a name of at most 60 characters', () => {
    expect( business.name ).to.not.be.empty;
    expect( business.desc ).to.have.lengthOf.at.most(60);
  });

  it('should have an alphanumeric description of at most 140 characters', () => {
    expect( business.name ).to.not.be.empty;
    expect( business.desc ).to.match(/^.+$/);
    expect( business.desc ).to.have.lengthOf.at.most(140);
  });

  it('should render', () => {
    const item = Enzyme.shallow(<Business name={business.name} desc={business.desc} />);

    expect( item.find(Card) ).to.have.lengthOf(1);
    expect( item.find(CardTitle).dive().text() ).to.equal(business.name);
    expect( item.find(CardText).dive().text() ).to.equal(business.desc);
  });

});
