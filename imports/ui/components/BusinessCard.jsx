import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge, Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Button, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';

import EditBusiness from '/imports/ui/components/EditBusiness';

export default class BusinessCard extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      editing: false,
      removeRequested: false,
      removeConfirmed: false,
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
            <CardTitle className="d-flex align-items-center">
              <Link to={`/businesses/${this.props.business._id}`}>{ this.props.business.name }</Link>
              <Badge color="primary" className="ml-2">{ this.props.business.category }</Badge>
            </CardTitle>
            <hr />
            <div className="d-flex flex-column align-items-stretch justify-content-between">
              <CardText className="mb-4">
                { this.props.business.description }
              </CardText>
              <CardText>
                <strong>{ this.props.business.city }, { this.props.business.state }, { this.props.business.zip }</strong>
              </CardText>
            </div>
          </CardBody>
          { this.props.admin &&
            <CardFooter className="d-flex align-items-center justify-content-between bg-primary text-white">
              <div>
                <Button color="primary" className="mr-1" onClick={ this.handleEditing }>
                  <i className="fas fa-pencil-alt" aria-hidden="true" />
                </Button>
                <Button color="primary" onClick={ this.handleRemove }>
                  <i className="fas fa-minus-circle" aria-hidden="true" />
                </Button>
              </div>
              <div>
                { this.state.editing &&
                <p className="mb-0 text-white text-sans-bold">Editing..</p>
                }
              </div>
            </CardFooter>
          }
        </Card>
        { this.props.admin && this.state.editing &&
          <EditBusiness
            id={ this.props.business._id }
            done={ this.handleEditing }
          />
        }
        { this.props.admin && this.state.removeRequested &&
          this.renderConfirmModal()
        }
      </div>
    );
  }
  
  renderConfirmModal() {
    return (
      <div>
        { this.props.admin &&
          <Modal isOpen={ this.state.removeRequested } toggle={ this.handleRemove }>
            <ModalHeader toggle={ this.handleRemove }>Confirm Business Deletion</ModalHeader>
            <ModalBody>
              Are you sure you want to remove "{ this.props.business.name }" from the Business Directory?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" id="removeConfirmed" onClick={ this.handleRemove }>Confirm</Button>
              <Button color="secondary" onClick={ this.handleRemove }>Never mind</Button>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }
  
  handleEditing(e) {
    this.setState({ editing: !this.state.editing, });
  }
  
  handleRemove(e) {
    if (e.target.id === 'removeConfirmed') {
      Meteor.call('businesses.remove', this.props.business._id, (err, res) => {
        console.log(err, res);
      });
    }
    
    this.setState({ removeRequested: !this.state.removeRequested, });
  }
  
}
