import { Accounts } from 'meteor/accounts-base';

/**
 * Defines how login should be handled (username vs id, password required)
 */
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.config({
  loginExpirationInDays: 0.02
});
