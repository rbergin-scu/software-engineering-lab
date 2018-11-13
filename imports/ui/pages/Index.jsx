import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import {
  Badge, Button, Col, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, Label, Row,
} from 'reactstrap';

import { Businesses, Categories } from '/imports/api/businesses/businesses';
import BusinessCard from '/imports/ui/components/BusinessCard';

class Index extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      categories: {},
    };
    
    for (let c of Object.keys(Categories)) {
      this.state.categories[c] = true;
    }
  
    this.handleCategory = this.handleCategory.bind(this);
  }
  
  render() {
    return (
      <div className="container my-4">
        { this.renderSearch() }
        <section className="index-businesses mb-5">
          <div className="row">
            { this.renderBusinesses() }
          </div>
        </section>
      </div>
    );
  }
  
  renderBusinesses() {
    let filters = Object.keys(this.state.categories).filter(c => this.state.categories[c]);
    
    return this.props.businesses.filter(biz => filters.includes(biz.category)).map((biz, i) => {
      return (
        <BusinessCard
          key={ i }
          business={ biz }
        />
      );
    });
  }
  
  renderSearch() {
    return (
      <div className="mb-5">
        <InputGroup className="mb-3">
          <Input type="search" name="searchBusinesses" id="searchBusinesses" />
          <InputGroupAddon addonType="append">
            <Button type="submit" color="primary">Search</Button>
          </InputGroupAddon>
        </InputGroup>
        { this.renderFilters() }
      </div>
    )
  }

  renderFilters() {
    return (
      <p className="badge-group">
        { Object.entries(Categories).map(([c, name], i) =>
          <Badge
            key={ i }
            color="primary" className="mr-3"
            id={ c } onClick={ this.handleCategory }>
            { name }
          </Badge>
        ) }
      </p>
    );
  }
  
  handleCategory(e) {
    let name = e.target.id;
    let active = e.target.classList.contains('badge-primary');
    
    e.target.classList.replace(
      active ? 'badge-primary' : 'badge-secondary',
      active ? 'badge-secondary' : 'badge-primary'
    );
    
    this.setState(prevState => {
      return {
        categories : {
          ...prevState.categories, [name]: !active
        }
      }
    });
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('businesses.public');
  
  return {
    businesses: Businesses.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(Index);
