import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge, Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

import EditBusiness from '/imports/ui/components/EditBusiness';
import RequestRemoval from '/imports/ui/components/RequestRemoval';

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
    
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleRemoval = this.toggleRemoval.bind(this);
  }
  
  render() {
    return (
      <div className={`col-12 col-md-${this.state.editing || (this.state.removeRequested && !this.props.admin) ? '12' : '4'} mb-3`}>
        <div className="row">
          <div className={ `col-12 col-md-${this.state.editing || (this.state.removeRequested && !this.props.admin) ? '6 px-0' : '12'}` }>
            <Card className="bg-light h-100">
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
                <CardFooter className="d-flex align-items-center justify-content-between bg-primary text-white">
                  <div>
                    <Button color="primary" className="mr-1" onClick={ this.toggleEditing }>
                      <i className="fas fa-pencil-alt" aria-hidden="true" />
                    </Button>
                    <Button color="primary" onClick={ this.props.admin ? this.handleRemove : this.toggleRemoval }>
                      <i className="fas fa-minus-circle" aria-hidden="true" />
                    </Button>
                  </div>
                </CardFooter>
            </Card>
          </div>
          { this.state.editing &&
          <div className="col-12 col-md-6 px-0">
            <EditBusiness
              id={ this.props.business._id }
              done={ this.toggleEditing }
            />
          </div>
          }
          { Meteor.user() ?
            this.state.removeRequested &&
            this.renderConfirmModal()
            :
            this.state.removeRequested &&
            <div className="col-12 col-md-6 px-0">
              <RequestRemoval
                id={ this.props.business._id }
                done={ this.toggleRemoval }
              />
            </div>
          }
        </div>
      </div>
    );
  }
  
  renderConfirmModal() {
    return (
      <div>
        { Meteor.user() &&
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
  
  toggleEditing(e) {
    this.setState({ editing: !this.state.editing, });
  }

  toggleRemoval(e) {
    this.setState({ removeRequested: !this.state.removeRequested, });
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
}
