import React from 'react';

import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button, Col, Row, } from 'reactstrap';
import BusinessDetails from "./BusinessDetails";

/**
 * A card providing a set of pertinent information about a requested edit in a compact form. Also allows admins
 * approve or deny the requested edit
 * */
export default class EditRequestCard extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      details: false,
    };

    this.approve = this.approve.bind(this);
    this.deny = this.deny.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }


  /**
   * Updates the selected Businesses entry
   * Removes the corresponding EditRequests entry
   */
  approve() {
    let requestId = this.props.edits.requestId;
    let businessId = this.props.edits.businessId;
    let business = this.props.edits.business;

    Meteor.call('businesses.update',
      businessId,
      business,
    );

    Meteor.call('editRequests.remove', {
      id: requestId,
    });
  }

  /**
   * Removes the selected EditRequests Entry
   */
  deny() {
    let requestId = this.props.edits.requestId;

    Meteor.call('editRequests.remove', {
      id: requestId,
    });
  }

  showDetails() {
    this.setState({ details: !this.state.details, });
  }

  render() {
    return (
      <div className={`col-12 col-md-${this.state.details ? '12' : '4'} mb-3`}>
        <div className="row">
          <div className={ `col-12 col-md-${this.state.details ? '6 px-0' : '12'}` }>
            <Card className="bg-light h-100">
              <CardBody>
                <CardTitle>{this.props.edits.name}</CardTitle>
                <hr className="mt-0"/>
                <CardText className="mb-0">Submitter: {this.props.edits.submitterName}</CardText>
                <CardText className="mb-0">Email: {this.props.edits.email}</CardText>
                <CardText className="mb-0">Phone #: {this.props.edits.phoneNumber}</CardText>
                <CardText className="mb-0">Grad year: {this.props.edits.gradYear}</CardText>
              </CardBody>
              <CardFooter className="bg-primary text-white">
                <Button color="primary" className="mr-1" onClick = { this.approve.bind(this) } >
                  <i className="fas fa-check-circle" aria-hidden="true"/>
                </Button>
                <Button color="primary" onClick = { this.deny.bind(this) } >
                  <i className="fas fa-times-circle" aria-hidden="true"/>
                </Button>
                <Button color="primary" onClick = { this.showDetails.bind(this) } >
                  <i className="fas fa-question-circle" aria-hidden="true"/>
                </Button>
              </CardFooter>
            </Card>
          </div>
          { this.state.details &&
          <BusinessDetails
            business={ this.props.edits.business }
            type={"update"}
          />
          }
        </div>
      </div>
    );
  }

}

