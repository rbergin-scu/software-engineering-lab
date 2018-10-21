import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Businesses from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'container py-5'}>
        {this.renderBusinesses()}
      </div>
    )
  }

  renderBusinesses() {
    return this.props.businesses.map((biz) => {
      return (
        <Business
          name={biz.name}
          desc={biz.desc}
        />
      );
    });
  }

}

export default withTracker(() => {
  Meteor.subscribe('businesses');

  return {
    businesses: Businesses.find({}).fetch(),
  };
})(Index);
