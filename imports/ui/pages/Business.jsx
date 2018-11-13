import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import {
  Badge, Button, Container, Col, Row,
} from 'reactstrap';

import { Businesses } from '/imports/api/businesses/businesses';

class Business extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
  }
  
  render() {
    if (this.props.loading) {
      return null;
    }
    
    const business = this.props.business[0];
    
    return (
      <div className="business-page">
        <Container fluid className="bg-light">
          <Container>
            <header className="d-flex justify-space-between py-4">
              <h2 className="d-flex align-items-center">
                { business.name }
                <Badge color="primary" className="ml-2">{ business.category }</Badge>
              </h2>
            </header>
            <Row>
              <Col md={9}>
                <img src={ business.photo } alt={ business.name } />
              </Col>
              <Col md={3} className="py-4 py-md-0">
                <h4>Website</h4>
                <p><a href={ business.website }>{ business.website }</a></p>
  
                <h4 className="mt-4">Phone Number</h4>
                <p>{ this.formatPhoneNumber(business.phoneNumber) }</p>
                
                <h4 className="mt-4">Street Address</h4>
                <p>
                  { business.streetAddress } <br />
                  { business.city }, { business.state }, { business.zip }
                </p>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container className="py-4">
          <Row>
            <Col md={9}>
              <p>{ business.desc }</p>
            </Col>
            <Col md={3} className="d-flex flex-column justify-content-end">
              <Button outline color="dark" className="mb-2">Find on Yelp <i className="fab fa-yelp ml-2" /></Button>
              <Button outline color="dark">Find on Google Maps <i className="fas fa-map ml-2" /></Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  
  formatPhoneNumber(phone) {
    phone = phone.replace(/[^\d]/g, '');
    
    if (phone.length === 10) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
  }
  
}

export default withTracker(props => {
  const id = props.match.params.id;
  const handle = Meteor.subscribe('businesses.find', id);
  
  return {
    loading: !handle.ready(),
    business: Businesses.find({ _id: id, }).fetch(),
  };
})(Business);
