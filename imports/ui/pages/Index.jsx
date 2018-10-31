import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Businesses from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';
import NewBusinessModal from '/imports/ui/components/NewBusinessModal';
import Submissions from '/imports/api/submissions/submissions';

class Index extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="bg-light py-3">
          { this.renderSubmit() }
        </div>
        <div className="container py-5">
          <section className="index-businesses">
            <div className="card-deck">
              { this.renderBusinesses() }
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  renderBusinesses() {
    return this.props.businesses.map((biz, i) => {
      return (
        <Business
          key={ i }
          name={ biz.name }
          desc={ biz.desc }
        />
      );
    });
  }
  
  renderSubmit() {
    return (
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col">
            <NewBusinessModal />
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
  Meteor.subscribe('submissions');
  
  return {
    businesses: Businesses.find({ verified: true }).fetch(),
    submissions: Submissions.find({ }).fetch(),
    currentUser: Meteor.user(),
  };
})(Index);
