import React from 'react';

export default class Error extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const details = this.props.details;
    
    return (
      <div>
        { details && details.length > 0 &&
        <div className="error d-flex align-items-center justify-content-between bg-warning p-3">
          <p className="mb-0" dangerouslySetInnerHTML={ { __html: details } } />
        </div>
        }
      </div>
    );
  }
  
}
