import React from 'react';

export default class Error extends React.Component {
  
  render() {
    return (
      <div className="error bg-warning">
        {this.props.msg.length > 0 &&
        <div className="container py-3">
          <p className="h5 d-flex align-items-center justify-content-between mb-0 text-white">
              <span>
                <strong>Whoops!&nbsp;</strong>
                <span className="font-weight-normal">
                  {this.props.msg.substr(0, this.props.msg.indexOf('[') - 1)}
                </span>
              </span>
            <button className="btn btn-warning" onClick={this.hide.bind(this)}>
              <i className="fas fa-times text-white"/>
            </button>
          </p>
        </div>
        }
      </div>
    );
  }
  
  hide() {
    document.getElementsByClassName('error')[0].outerHTML = '';
  }
  
}
