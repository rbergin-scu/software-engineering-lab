import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';

import { Businesses } from '/imports/api/businesses/businesses';
import EditBusiness from '/imports/ui/components/EditBusiness';

class BusinessCard extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      editing: false,
    };
    
    this.handleEditing = this.handleEditing.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  
  render() {
    return (
      <div className={`col-md-${this.state.editing ? '12' : '4'} d-flex align-items-stretch mb-3`}>
        <Card className="bg-light shadow">
          <CardImg top width="100%" src="test.jpg" alt={ this.props.business.name } />
          <CardBody>
            <CardTitle>
              <Link to={`/businesses/${this.props.business._id}`}>{ this.props.business.name }</Link>
            </CardTitle>
            <hr className="mt-0"/>
            <CardText className="mb-0">{ this.props.business.desc }</CardText>
          </CardBody>
          <CardFooter className="bg-primary text-white">
            <Button color="primary" className="mr-1" onClick={ this.handleEditing }>
              <i className="fas fa-pencil-alt" aria-hidden="true" />
            </Button>
            <Button color="primary" onClick={ this.handleRemove }>
              <i className="fas fa-minus-circle" aria-hidden="true" />
            </Button>
          </CardFooter>
        </Card>
        { this.state.editing &&
          <EditBusiness id={ this.props.business._id } />
        }
      </div>
    );
  }
  
  handleEditing() {
    this.setState({ editing: !this.state.editing, });
  }
  
  handleRemove() {
    // TODO display prompt confirming desire to remove
    // on Yes, Meteor.call
    Meteor.call('businesses.remove', this.props.id, (err, res) => {
      console.log('err'+err);
      console.log('res'+res);
    });
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('businesses.public');
  
  return {
    businesses: Businesses.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(BusinessCard);
