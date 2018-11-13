import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap';

export default class BusinessCard extends React.Component {
  
  render() {
    return (
      <div className="col-md-4 d-flex align-items-stretch mb-3">
        <Card className="bg-light shadow">
          <CardImg top width="100%" src="test.jpg" alt={this.props.name}/>
          <CardBody>
            <CardTitle><Link to={`/businesses/${this.props.id}`}>{this.props.name}</Link></CardTitle>
            <hr className="mt-0"/>
            <CardText className="mb-0">{this.props.desc}</CardText>
          </CardBody>
          <CardFooter className="bg-primary text-white">
            <Button color="primary" className="mr-1">
              <i className="fas fa-pencil-alt" aria-hidden="true"/>
            </Button>
            <Button color="primary">
              <i className="fas fa-minus-circle" aria-hidden="true"/>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
}
