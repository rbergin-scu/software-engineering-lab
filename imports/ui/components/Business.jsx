import React from 'react';

export default class Business extends React.Component {

  render() {
    return (
      <div className={'bg-light mb-4'}>
        <p>{this.props.name}: {this.props.desc}</p>
      </div>
    );
  }

}
