import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Badge, Button, Input, InputGroup, InputGroupAddon, } from 'reactstrap';

import { Businesses, Categories } from '/imports/api/businesses/businesses';
import BusinessCard from '/imports/ui/components/BusinessCard';

/**
 * The homepage that greets all users upon viewing the page. Controls the business search function, and
 * by extension each business presented.
 */
class Index extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      categories: {},
      search: "",
    };
    
    // by default, filter nothing (show all categories)
    for (let c of Object.keys(Categories)) {
      this.state.categories[c] = true;
    }
  
    this.admin = this.admin.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  render() {
    return (
      <div className="container my-4">
        { this.renderSearch() }
        <div className="row">
          { this.renderBusinesses() }
        </div>
      </div>
    );
  }
  
  renderBusinesses() {
    let filters = Object.keys(this.state.categories).filter(c => this.state.categories[c]);
    let term = this.state.search;
    
    return this.props.businesses.filter(biz => (filters.includes(biz.category) && (term == "" || term == biz.name || term == biz.category || term == biz.country || term == biz.city || term == biz.state || term == biz.zip))).map((biz, i) => {
      return (
        <BusinessCard
          key={ i }
          business={ biz }
          admin={ this.admin }
        />
      );
    });
  }
  
  renderFilters() {
    return (
      <p className="badge-group">
        { Object.entries(Categories).map(([c, name], i) =>
          <Badge
            key={ i }
            id={ c }
            onClick={ this.handleCategory }
            color="primary" className="mr-3">
            { name }
          </Badge>
        ) }
      </p>
    );
  }
  
  renderSearch() {
    return (
      <div className="mb-5">
        <InputGroup className="mb-3">
          <Input type="search" name="searchBusinesses" id="searchBusinesses" />
          <InputGroupAddon addonType="append">
            <Button type="submit" color="primary" onClick= {this.handleSearch}>Search</Button>
          </InputGroupAddon>
        </InputGroup>
        { this.renderFilters() }
      </div>
    )
  }
  
  /**
   * Toggles the state of an active search filter category, which is indicated visually by altering the
   * color of the corresponding badge.
   *
   * @param e The category to toggle.
   */
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

  handleSearch(e) {
    let searchTerm = document.getElementById("searchBusinesses").value;
    console.log(searchTerm);

    this.setState(prevState => {
      return {
        search : searchTerm
      }
    });
  }
  
  /**
   * Whether the current user exists. Since our only user is an admin, this is always an administrator.
   */
  admin() {
    return this.props.currentUser !== null;
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('businesses.all');
  
  return {
    businesses: Businesses.find().fetch(),
    currentUser: Meteor.user(),
  };
})(Index);
