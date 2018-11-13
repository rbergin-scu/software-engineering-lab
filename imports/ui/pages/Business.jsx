import React from 'react';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';

import { Businesses } from '/imports/api/businesses/businesses';

class Business extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.loading) {
      return null;
    }
    
    return (
      <div>
        <h2>{ this.props.business[0].name }</h2>
      </div>
    )
  }
  
}

export default withTracker(props => {
  const id = props.match.params.id;
  const handle = Meteor.subscribe('businesses.find', id);
  
  return {
    loading: !handle.ready(),
    business: Businesses.find({ _id: id, }).fetch(),
  };
})(Business);
