import React from 'react';

export default class Business extends React.Component {

  render() {
    return (
      <div className={'bg-light mb-4'}>
        <h1>{this.props.name}</h1>
        <hr />
        <p>{this.props.desc}</p>
      </div>
    );
  }

}
