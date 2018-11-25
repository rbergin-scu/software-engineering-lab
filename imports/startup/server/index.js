import cloudinary from 'cloudinary';
import { Meteor } from 'meteor/meteor';

import { Accounts } from "meteor/accounts-base";
import { Businesses } from '/imports/api/businesses/businesses';

Meteor.startup(() => {
  // insert test data if there's nothing
  if (!Businesses.findOne()) {
    Businesses.insert({
      name: 'Krusty Krab',
      description: 'This is your world. In your world you have total and absolute power. Trees get lonely too, so we\'ll give him a little friend.',
      photo: '/test.jpg',
      category: 'food',
      phoneNumber: '1234567890',
      website: 'https://scu.edu',
      streetAddress: '111 Conch St',
      city: 'Bikini Bottom',
      state: 'OR',
      zip: '97068',
    });
  }

  if (!Meteor.users.findOne({ username: 'admin', })) {
    Accounts.createUser({
      username: 'admin',
      password: '12345',
    });
  }
  
  // ---- cloudinary config
  cloudinary.config({
    cloud_name: 'dir7oszd4',
    api_key: '882423461476917',
    api_secret: '8f3qiKdinEUcTTTod_Hj4YDaAxk',
  });
  
  // TODO returns url which can be added to mongodb as link to header image
  /*cloudinary.v2.uploader.upload('https://res.cloudinary.com/demo/image/upload/v1371281596/sample.jpg', (error, result) => {
    console.log(result, error);
  });*/
});
