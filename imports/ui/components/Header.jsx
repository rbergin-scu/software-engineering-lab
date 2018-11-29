import React from 'react';

import NewBusiness from '/imports/ui/components/NewBusiness';

/**
 * The Header of all system pages. Contains a link back to the homepage
 */
export default class Header extends React.Component {
  
  render() {
    return (
      <header>
        <div className="bg-primary mb-0">
          <div className="container">
            <NewBusiness />
          </div>
        </div>
        <div className="border-top border-primary">
          <div className="container py-3 text-center text-md-left">
            <h1><a href="/" className="text-dark">Alumni Business Database</a></h1>
            <h5 className="text-uppercase wordmark"><a href="https://scu.edu">Santa Clara University</a></h5>
          </div>
        </div>
      </header>
    );
  }
  
}
