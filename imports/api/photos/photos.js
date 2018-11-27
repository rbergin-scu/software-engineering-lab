import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

/**
 * A database of Businesses.
 */
const Photos = new FilesCollection({
  
  collectionName: 'photos',
  allowClientCode: false,
  storagePath: 'private/photos',
  
  onBeforeUpload(file) {
    if (file.size <= (10 * 1024 * 1024) && /png|jp?eg/i.test(file.extension)) {
      return true;
    }
    
    return 'Please upload a photo no larger than 10 MB.';
  },
  
});

if (Meteor.isClient) {
  Meteor.subscribe('files.photos.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.photos.all', () => Photos.find().cursor)
}

Meteor.methods({
  
  'photos.insert'(file) {
  
  }
  
});

export default Photos;
