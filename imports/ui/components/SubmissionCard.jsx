import React from 'react';

import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';
import BusinessDetails from "./BusinessDetails";

export default class SubmissionCard extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      details: false,
    };

    this.approve = this.approve.bind(this);
    this.deny = this.deny.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }


  approve() {
    let id = this.props.submission.id;
    let business = this.props.submission.business;

    Meteor.call('businesses.insert', {
      name: business.name,
      description: business.description,
      photo: business.photo,
      country: business.country,
      streetAddress: business.streetAddress,
      state: business.state,
      city: business.city,
      zip: business.zip,
      phoneNumber: business.phoneNumber,
      website: business.website,
      category: business.category,
    });

    Meteor.call('submissions.remove', {
      id: id
    });
  }

  deny() {
    let id = this.props.submission.id;

    Meteor.call('submissions.remove', {
      id: id
    });
  }

  showDetails() {
    this.setState({ details: !this.state.details, });
  }

  render() {
    return (
      <div className={`col-md-${this.state.details ? '12' : '4'} d-flex align-items-stretch mb-3`}>
        <Card className="bg-light shadow">
          <CardBody>
            <CardTitle>{this.props.submission.name}</CardTitle>
            <hr className="mt-0"/>
            <CardText className="mb-0">Submitter: {this.props.submission.submitterName}</CardText>
            <CardText className="mb-0">Email: {this.props.submission.email}</CardText>
            <CardText className="mb-0">Phone #: {this.props.submission.phoneNumber}</CardText>
            <CardText className="mb-0">Grad year: {this.props.submission.gradYear}</CardText>
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
        { this.state.details &&
        <BusinessDetails
          business={ this.props.submission.business }
          type={"submission"}
        />
        }
      </div>
    );
  }

}
