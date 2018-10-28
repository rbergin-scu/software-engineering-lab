import React from 'react';

export default class Error extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="meteor-error">
      { this.props.msg.length > 0 &&
        <React.Fragment>
          <h5>Errors</h5>
          <div className="d-flex align-items-center justify-content-between">
            <p className="text-warning mb-0" dangerouslySetInnerHTML={ {__html: this.props.msg, } } />
            <button className="btn btn-warning" onClick={ this.hide.bind(this) }>
              <i className="fas fa-times text-white"/>
            </button>
          </div>
        </React.Fragment>
      }
      </div>
    );
  }
  
  hide() {
    document.getElementById('meteor-error').outerHTML = '';
  }
  
}
