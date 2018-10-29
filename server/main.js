import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import '/imports/startup/server/index';
import '/imports/api/businesses/businesses';
import '/imports/api/submissions/submissions';

SimpleSchema.defineValidationErrorTransform(error => {
  const customError = new Meteor.Error(error.message);
  
  // first indicate a validation error
  customError.error = 'validation-error';
  
  // now loop through each field that threw an error
  customError.details = '<ol>';
  for (let it = 0; it < error.details.length; it++) {
    customError.details += `<li>${error.details[it].message}</li>`;
  }
  customError.details += '</ol>';
  
  return customError;
});

Meteor.startup(() => {

});
