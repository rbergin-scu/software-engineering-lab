import React from 'react';

export default class Business extends React.Component {

  render() {
    return (
      <article className={'sab-business card bg-light shadow'}>
        <img className={'card-img-top'} src={'test.jpg'} alt={this.props.name} />
        <div className={'card-body'}>
          <h2>{this.props.name}</h2>
          <hr className={'mt-0'} />
          <p className={'mb-0'}>{this.props.desc}</p>
        </div>
        <div className={'card-footer bg-primary text-white'}>
          <i className={'fas fa-pencil-alt'} aria-hidden={'true'} />
          <i className={'fas fa-minus-circle pl-3'} aria-hidden={'true'} />
        </div>
      </article>
    );
  }

}
