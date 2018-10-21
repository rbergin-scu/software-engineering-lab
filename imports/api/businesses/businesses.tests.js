import Adapter from 'enzyme-adapter-react-16';
import { assert } from 'chai';
import Enzyme from 'enzyme';
import faker from 'faker';
import React from 'react';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { shallow } from 'enzyme';

import { Businesses } from './businesses';
import Business from '/imports/ui/components/Business';

// macro to automatically reset test database to empty
Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

// configure React test adapter
Enzyme.configure({ adapter: new Adapter() });

// generate fake test data
Factory.define('business', Businesses, {
  name: () => faker.lorem.word(),
  desc: () => faker.lorem.sentence(),
});

describe('Businesses', () => {

  const biz = Factory.create('business');

  beforeEach((done) => {
    Meteor.call('test.resetDatabase', done);
  });

  it('should have an alphanumeric name of at most 60 characters', () => {
    assert.isNotEmpty(biz.name);
    assert.match(biz.name, /^\w+$/); // this regex actually captures empty string too
    assert.isAtMost(biz.name.length, 60);
  });

  it('should have an alphanumeric description of at most 140 characters', () => {
    assert.isNotEmpty(biz.desc);
    assert.match(biz.desc, /^.+$/);
    assert.isAtMost(biz.desc.length, 140);
  });

  it('should render', () => {
    const item = shallow(<Business name={biz.name} desc={biz.desc} />);

    assert(item.contains(<h2>{biz.name}</h2>), 'the business name');
    assert(item.contains(<p>{biz.desc}</p>), 'the description');
  });

});
