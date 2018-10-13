import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Footer from '/imports/ui/template/Footer.jsx';
import Header from '/imports/ui/template/Header.jsx';
import Index from '/imports/ui/Index.jsx';

Meteor.startup(() => {
  // define language in <html> decl., as standard in WCAG 2.0, Guideline 3.1.1
  document.documentElement.setAttribute('lang', 'en-US');

  render(<Header />, document.getElementById('react-target-header'));
  render(<Footer />, document.getElementById('react-target-footer'));

  render(<Index />, document.getElementById('react-target'));
});
