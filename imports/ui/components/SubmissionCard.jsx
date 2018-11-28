import React from 'react';

import { Button, Card, CardBody, CardFooter, CardText, } from 'reactstrap';

/**
 * A card that contains the provided personal info of a submitter and the business they proposed to submit.
 */
export default class SubmissionCard extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.handleApprove = this.handleApprove.bind(this);
    this.handleDeny = this.handleDeny.bind(this);
  }
  
  render() {
    return (
      <div className="col-md-4 d-flex align-items-stretch mb-3">
        <Card className="bg-light shadow">
          <CardBody>
            <CardText className="mb-0">Submitter: { this.props.submission.gradName }</CardText>
            <CardText className="mb-0">Email: { this.props.submission.gradEmail }</CardText>
            <CardText className="mb-0">Phone #: { this.props.submission.gradPhone }</CardText>
            <CardText className="mb-0">Grad year: { this.props.submission.gradYear }</CardText>
          </CardBody>
          <CardFooter className="bg-primary text-white">
            <Button color="primary" className="mr-1" onClick={ this.handleApprove }>
              <i className="fas fa-check-circle" aria-hidden="true" />
            </Button>
            <Button color="primary" onClick={ this.handleDeny }>
              <i className="fas fa-times-circle" aria-hidden="true" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  handleApprove() {
    Meteor.call('businesses.insert', this.props.submission.business, (err) => {
      if (err) throw err;
      
      Meteor.call('submissions.remove', this.props.submission._id);
    });
  }

  handleDeny() {
    Meteor.call('submissions.remove', this.props.submission._id);
  }

}
