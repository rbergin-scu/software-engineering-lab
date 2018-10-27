import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Businesses from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';
import Error from '/imports/ui/components/Error';

class Index extends React.Component {

  constructor( props ) {
    super(props);
    
    this.state = {
      error: '',
    };
  }
  
  insertBusiness() {
    Meteor.call('businesses.insert', {
    
    }, (err, res) => {
      if (err) {
        this.setState({ error: err.message });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="bg-light py-3">
          { this.renderSubmit() }
        </div>
        <Error
          msg={ this.state.error }
        />
        <div className="container py-5">
          <section className="index-businesses">
            <div className="card-deck">
              { this.renderBusinesses() }
            </div>
          </section>
        </div>
      </div>
    )
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
  
  renderSubmit() {
    return (
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col">
            <button className="btn btn-outline-primary">
              <i className="fas fa-plus-circle pr-1" aria-hidden="true" /> Submit New Business
            </button>
          </div>
          <div className="col text-right">
            <p className="mb-0">Hello, <u>admin</u></p>
          </div>
        </div>
      </div>
    );
  }

}

export default withTracker(() => {
  Meteor.subscribe('businesses');

  return {
    businesses: Businesses.find({ }).fetch(),
  };
})(Index);