import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import Enzyme from 'enzyme';
import faker from 'faker';
import React from 'react';
//import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';
import { Factory } from 'meteor/dburles:factory';

import Submissions from './submissions';
//import Submissions from '/imports/ui/components/Submissions';

// configure React test adapter
Enzyme.configure({ adapter: new Adapter() });
/*
Meteor.methods({
  // clear stub data
  'test.restoreDatabase': () => StubCollections.restore(),

  // generate stub data
  'test.stubDatabase': () => StubCollections.stub(['submissions']),
});
*/

Factory.define('submission', Submissions, {
    name: () => faker.name.firstName(),
    email: () => faker.internet.email(),
    phoneNumber: () => faker.phone.phoneNumber(),
    gradYear: () => faker.random.number(),
    businessID: () => faker.random.number(),
});

let expect = chai.expect;

describe('Submissions', () => {

    let submission;
    let submission2;
    let id;
    let id2;

    before(() => {
        submission = Factory.create('submission');
        submission2 = Factory.create('submission');
        id = submission._id;
        id2 = submission2._id;
    });

    it('should have a name of at most 60 characters', () => {
        expect( submission.name ).to.not.be.empty;
        expect( submission.name ).to.have.lengthOf.at.most(60);
    });

    it('should have an email of at most 60 characters', () => {
        expect( submission.email ).to.not.be.empty;
        expect( submission.email ).to.have.lengthOf.at.most(60);
    });

    it('should have a phone number of at most 30 characters', () => {
        expect( submission.phoneNumber ).to.not.be.empty;
        expect( submission.phoneNumber ).to.have.lengthOf.at.most(30);
    });


    //no Submissions front end yet
    /*it('should render', () => {
      const item = Enzyme.shallow(<Submission name={submission.name} />);
      expect( item.find(Card) ).to.have.lengthOf(1);
      expect( item.find(CardTitle).dive().text() ).to.equal(submission.name);
    });*/

    it('should be added to the collection', () => {
        Meteor.call('submissions.insert', {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.phoneNumber(),
            gradYear: faker.random.number(),
            businessID: faker.random.number(),
        });
    });

    it('should be added to the collection without the optional fields', () => {
        Meteor.call('submissions.insert', {
            name: faker.name.firstName(),
            businessID: faker.random.number(),
        });
    });

    it('should be added to the collection with only some of the optional fields', () => {
        Meteor.call('submissions.insert', {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.phoneNumber(),
            businessID: faker.random.number(),
        });
    });

    it('should be removed from the collection', () => {
        Meteor.call('submissions.remove', {
            submissionID: id,
        });
    });

    it('should update the collection', () => {
        Meteor.call('submissions.update', {
            name: "Nani",
            email: submission2.email,
            phoneNumber: submission2.phoneNumber,
            gradYear: submission2.gradYear,
            businessID: submission2.businessID,
            submissionID: id2,
        });
    });
});