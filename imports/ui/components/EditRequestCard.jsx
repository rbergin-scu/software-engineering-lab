import React from 'react';

import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';

export default class EditRequestCard extends React.Component {


  constructor(props) {
    super(props);

    this.approve = this.approve.bind(this);
    this.deny = this.deny.bind(this);
  }


  approve() {
    let requestId = this.props.requestId;
    let businessId = this.props.businessId;
    let business = this.props.business;

    Meteor.call('businesses.update', {
      id: businessId,
      business: business,
    });

    Meteor.call('editRequests.remove', {
      id: requestId,
    });
  }

  deny() {
    let requestId = this.props.requestId;

    Meteor.call('editRequests.remove', {
      id: requestId,
    });
  }

  render() {
    return (
      <div className="col-md-4 d-flex align-items-stretch mb-3">
        <Card className="bg-light shadow">
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <hr className="mt-0"/>
            <CardText className="mb-0">Submitter: {this.props.submitterName}</CardText>
            <CardText className="mb-0">Email: {this.props.email}</CardText>
            <CardText className="mb-0">Phone #: {this.props.phoneNumber}</CardText>
            <CardText className="mb-0">Grad year: {this.props.gradYear}</CardText>
          </CardBody>
          <CardFooter className="bg-primary text-white">
            <Button color="primary" className="mr-1" onClick = { this.approve.bind(this) } >
              <i className="fas fa-check-circle" aria-hidden="true"/>
            </Button>
            <Button color="primary" onClick = { this.deny.bind(this) } >
              <i className="fas fa-times-circle" aria-hidden="true"/>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

}
