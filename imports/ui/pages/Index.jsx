import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Businesses from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';

class Index extends React.Component {

  render() {
    return this.props.list.map((biz) => (
      <div className={'container py-5'}>
        <Business name={biz.name} desc={biz.desc} />
      </div>
    ));
  }

}

export default withTracker(() => {
  return {
    list: Businesses.find({}).fetch(),
  };
})(Index);
