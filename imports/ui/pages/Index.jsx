import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Businesses from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';

class Index extends React.Component {

  constructor( props ) {
    super(props);
    
    this.state = {
      error: '',
    };
  }
  
  insertBusiness() {
    Meteor.call('businesses.insert', {
      name: 'Krusty Krab',
      desc: 'Use your imagination, let it go. This is your world. In your world you have total and absolute power. Trees get lonely too, so we\'ll give him a little friend.',
      photo: 'https://res.cloudinary.com/dir7oszd4/image/upload/v1540095717/sample.jpg',
    }, (err, res) => {
      if (err) {
        this.setState({ error: err.message });
      }
    });
  }
  
  hideError() {
    this.setState({ error: '' });
  }

  render() {
    return (
      <div>
        <div className={'bg-dark py-1'}>
          {this.renderAdmin()}
        </div>
        {this.renderError()}
        <div className={'container py-5'}>
          {this.renderSearch()}
          <section className={'card-deck pt-3'}>
            {this.renderBusinesses()}
          </section>
        </div>
      </div>
    )
  }
  
  renderAdmin() {
    return (
      <div className={'container'}>
        <div className={'row d-flex align-items-center'}>
          <div className={'col'}>
            <button className={'btn btn-dark'} onClick={this.insertBusiness.bind(this)}>
              <i className={'fas fa-plus-circle text-white'} aria-hidden={'true'} />
            </button>
          </div>
          <div className={'col text-right'}>
            <p className={'mb-0 text-white'}>Hello, <u>admin</u></p>
          </div>
        </div>
      </div>
    );
  }

  renderBusinesses() {
    return this.props.businesses.map((biz, i) => {
      return (
        <Business
          key={i}
          name={biz.name}
          desc={biz.desc}
        />
      );
    });
  }
  
  renderSearch() {
    return (
      <div className={'sab-search w-100'}>
        <div className={'input-group'}>
          <div className={'input-group-prepend'}>
            <button className={'btn btn-outline-secondary'} type={'button'}>
              <i className={'fas fa-filter'} />
            </button>
          </div>
          <input type={'text'} className={'form-control'}
                 placeholder={'"food in Santa Clara", "marketing", "a business title", ..'}
                 aria-label={'Search for a business by title, location, or type of service.'}
                 aria-describedby={'button-search'} />
          <div className={'input-group-append'} id={'button-search'}>
            <button className={'btn btn-outline-primary'} type={'button'}>Search</button>
          </div>
        </div>
      </div>
    );
  }
  
  renderError() {
    if (this.state.error.length > 0) {
      return (
        <section className={'error bg-warning'}>
          <div className={'container py-3'}>
            <p className={'h5 d-flex align-items-center justify-content-between mb-0 text-white'}>
              <span>
                <strong>Whoops!&nbsp;</strong>
                <span className={'font-weight-normal'}>
                  {this.state.error.substr(0, this.state.error.indexOf('[') - 1)}
                </span>
              </span>
              <button className={'btn btn-warning'} onClick={this.hideError.bind(this)}>
                <i className={'fas fa-times text-white'} />
              </button>
            </p>
          </div>
        </section>
      );
    }
  }

}

export default withTracker(() => {
  Meteor.subscribe('businesses');

  return {
    businesses: Businesses.find({}).fetch(),
  };
})(Index);
