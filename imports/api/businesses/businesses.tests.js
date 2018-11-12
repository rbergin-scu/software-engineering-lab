import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import Enzyme from 'enzyme';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';
import React from 'react';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';

import { Businesses, Categories } from './businesses';
import Business from '/imports/ui/components/Business';

let expect = chai.expect;
chai.use(require('chai-string'));

/*
  enable React component testing
 */
Enzyme.configure({adapter: new Adapter()});

/*
  create a false Business with randomly-generated content
 */
StubCollections.stub(Businesses);

Factory.define('business', Businesses, {
  name: () => faker.company.companyName(),
  desc: () => faker.company.catchPhrase(),
  photo: () => faker.image.imageUrl(),
  category: () => {
    let keys = Object.keys(Categories);
    return Categories[keys[ keys.length * Math.random() << 0 ]];
  },
  country: () => faker.address.country(),
  streetAddress: () => faker.address.streetAddress(),
  state: () => faker.address.stateAbbr(),
  city: () => faker.address.city(),
  zip: () => faker.address.zipCode(undefined),
  phoneNumber: () => faker.phone.phoneNumber(),
  website: () => faker.internet.url(),
  verified: true,
});

describe('Businesses', () => {
  let business = Factory.build('business');
  
  describe('schema', () => {
    it('should have a Name of at most 60 characters which resembles the title of a company', () => {
      expect(business.name).to.not.be.empty;
      expect(business.name).to.have.lengthOf.at.most(60);
      expect(business.name).to.match(/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!\-":;,]{2,}$/);
    });
    
    it('should have a Description of at most 140 characters', () => {
      expect(business.desc).to.not.be.empty;
      expect(business.desc).to.have.lengthOf.at.most(140);
      expect(business.desc).to.match(/(\n|^).*?(?=\n|$)/);
    });
    
    it('should have a valid Category', () => {
      expect(business.category).to.not.be.empty;
    });
    
    it('should have a Country of at most 60 characters', () => {
      expect(business.country).to.not.be.empty;
      expect(business.country).to.have.lengthOf.at.most(60);
      expect(business.country).to.match(/[a-zA-Z]{2,}/);
    });
    
    it('should have a Street address of at most 60 characters', () => {
      expect(business.streetAddress).to.not.be.empty;
      expect(business.streetAddress).to.have.lengthOf.at.most(60);
      expect(business.streetAddress).to.match(/^\s*\S+(?:\s+\S+){2}/);
    });
    
    it('should have a State in code format (AL, AK, ..)', () => {
      expect(business.state).to.not.be.empty;
      expect(business.state).to.match(/[A-Z]{2}/);
    });
    
    it('should have a City of at most 60 characters', () => {
      expect(business.city).to.not.be.empty;
      expect(business.city).to.have.lengthOf.at.most(60);
      expect(business.city).to.match(/[a-zA-Z]{2,}/);
    });
    
    it('should have a ZIP code', () => {
      expect(business.zip).to.not.be.empty;
      expect(business.zip).to.match(/^\d{5}(?:[-\s]\d{4})?$/);
    });
    
    it('should have a Phone number', () => {
      expect(business.phoneNumber).to.not.be.empty;
      expect(business.phoneNumber).to
        .match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/);
    });
    
    it('should have a Website of at most 100 characters', () => {
      expect(business.website).to.not.be.empty;
      expect(business.website).to.have.lengthOf.at.most(100);
      expect(business.website).to.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/);
    });
  });
  
  describe('methods', () => {
    beforeEach(() => {
      resetDatabase();
    });
    
    it('should be added to the collection', () => {
      Meteor.call('businesses.insert', business, (error, result) => {
        if (error) {
          console.log('error: ' + error);
        }
      });
    });
  
    it('should be removed from the collection', () => {
    
    });
  });
  
  it('should render', () => {
    const item = Enzyme.shallow(<Business name={business.name} desc={business.desc}/>);
    
    expect(item.find(Card)).to.have.lengthOf(1);
    expect(item.find(CardTitle).dive().text()).to.equal(business.name);
    expect(item.find(CardText).dive().text()).to.equal(business.desc);
  });
  
});

StubCollections.restore();
