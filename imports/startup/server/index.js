import cloudinary from 'cloudinary';
import { Meteor } from 'meteor/meteor';

import Businesses from '/imports/api/businesses/businesses';
import {Accounts} from "meteor/accounts-base";

Meteor.startup(() => {
  // insert test data if there's nothing
  if (!Businesses.findOne({})) {
    Businesses.insert({
      name: 'Krusty Krab',
      desc: 'Use your imagination, let it go. This is your world. In your world you have total and absolute power. Trees get lonely too, so we\'ll give him a little friend.',
      photo: 'https://res.cloudinary.com/dir7oszd4/image/upload/v1540095717/sample.jpg',
      verified: true,
    });
  }

  if (!Meteor.users.findOne({username: "admin"})) {
    Accounts.createUser({
      username: "admin",
      password: "12345",
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
