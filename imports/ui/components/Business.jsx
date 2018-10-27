import React from 'react';

import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';

export default class Business extends React.Component {

  render() {
    return (
      <Card className="bg-light shadow">
        <CardImg top width="100%" src="test.jpg" alt={this.props.name} />
        <CardBody>
          <CardTitle>{this.props.name}</CardTitle>
          <hr className="mt-0" />
          <CardText className="mb-0">{this.props.desc}</CardText>
        </CardBody>
        <CardFooter className="bg-primary text-white">
          <Button color="primary" className="mr-1">
            <i className="fas fa-pencil-alt" aria-hidden="true" />
          </Button>
          <Button color="primary">
            <i className="fas fa-minus-circle" aria-hidden="true" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

}