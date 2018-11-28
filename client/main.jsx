import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '/imports/ui/layouts/App';

Meteor.startup(() => {
  // define language in <html> decl., as standard in WCAG 2.0, Guideline 3.1.1
  document.documentElement.setAttribute('lang', 'en-US');
  
  render(<App />, document.getElementById('react-target'));
});
