import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className="bg-light border-top border-primary">
        <div className="container py-3 text-center text-md-left">
          <h1>Alumni Business Database</h1>
          <h5 className="text-primary text-uppercase wordmark">Santa Clara University</h5>
        </div>
      </div>
    );
  }

}
