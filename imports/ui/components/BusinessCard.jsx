import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge, Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

import EditBusiness from '/imports/ui/components/EditBusiness';

/**
 * A card providing a set of pertinent information about the business in a compact form. Also provides utilities to
 * edit and remove the business, both for admins (direct access) and all users (requests for admins to process).
 */
export default class BusinessCard extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      /* whether an admin is currently editing this business */
      editing: false,
      
      removeRequested: false,
      removeConfirmed: false,
    };
    
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }
  
  render() {
    return (
      <div className={`col-md-${this.state.editing ? '12' : '4'} d-flex align-items-stretch mb-3`}>
        <Card className="bg-light shadow">
          <CardImg top width="100%" src={ this.props.business.photo } alt={ this.props.business.name } />
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
                <Button color="primary" className="mr-1" onClick={ this.toggleEditing }>
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
            done={ this.toggleEditing }
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
  
  /**
   * Handle a request to remove this business, which invokes a modal to confirm or cancel the removal.
   *
   * @param e The source of the request, which lets us distinguish request from confirmation.
   */
  handleRemove(e) {
    // the target is coming from the modal (request confirmed)
    if (e.target.id === 'removeConfirmed') {
      Meteor.call('businesses.remove', this.props.business._id, (err) => {
        if (err) throw err;
      });
    }
    
    this.setState({ removeRequested: !this.state.removeRequested, });
  }
  
  toggleEditing() {
    this.setState({ editing: !this.state.editing, });
  }
  
}
