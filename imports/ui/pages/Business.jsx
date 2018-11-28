import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Badge, Container, Col, Row, } from 'reactstrap';

import { Businesses } from '/imports/api/businesses/businesses';

/**
 * A component modelling one Business, as found in the collection, and all of its information on one page.
 * Checks for values that may not have been filled in (e.g. street address information).
 */
class Business extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
  }
  
  render() {
    const business = this.props.business[0];
    
    return (
      <div className="business-page">
        <Container fluid className="bg-light">
          <Container>
            <header className="d-flex justify-space-between py-4">
              <h2 className="d-flex align-items-center">
                { business.name }
                <Badge color="primary" className="ml-3">{ business.category }</Badge>
              </h2>
            </header>
            <Row>
              <Col md={9}>
                <img src={ business.photo } alt={ business.name } />
              </Col>
              <Col md={3} className="py-4 py-md-0">
                { business.website &&
                <div>
                  <h4>Website</h4>
                  <p><a href={ business.website }>{ business.website }</a></p>
                </div>
                }
  
                { business.phoneNumber &&
                <div>
                  <h4 className="mt-4">Phone Number</h4>
                  <p>{ this.formatPhoneNumber(business.phoneNumber) }</p>
                </div>
                }
                
                { (business.streetAddress || (business.city && business.state && business.zip)) &&
                <h4 className="mt-4">Address</h4>
                }
                
                { business.streetAddress &&
                <p>{ business.streetAddress }</p>
                }
  
                { business.city && business.state && business.zip &&
                <p>{business.city}, {business.state}, {business.zip}</p>
                }
              </Col>
            </Row>
          </Container>
        </Container>
        <Container className="py-4">
          <Row>
            <Col md={12}>
              <p className="business-description">{ business.description }</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  
  formatPhoneNumber(phone) {
    if (phone) return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    
    return '';
  }
  
}

export default withTracker(props => {
  Meteor.subscribe('businesses.one', props.match.params.id);
  
  return {
    business: Businesses.find().fetch(),
  };
})(Business);
