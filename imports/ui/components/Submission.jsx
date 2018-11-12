import React from 'react';

import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';

export default class Submission extends React.Component {

  approve(e) {

  }

  deny(e) {

  }

  render() {
    return (
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
          <Button color="primary" className="mr-1" onClick = { this.approve() } >
            <i className="fas fa-check-circle" aria-hidden="true"/>
          </Button>
          <Button color="primary" onClick = { this.deny() } >
            <i className="fas fa-times-circle" aria-hidden="true"/>
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
