import React from 'react';

export default class Error extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-warning mb-0" dangerouslySetInnerHTML={ { __html: this.props.details } } />
        </div>
      </div>
    );
  }
  
}
