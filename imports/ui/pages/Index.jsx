import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Businesses from '/imports/api/businesses/businesses';
import Business from '/imports/ui/components/Business';
import NewBusinessModal from '/imports/ui/components/NewBusinessModal';
import Submissions from '/imports/api/submissions/submissions';

class Index extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      food: false,
      entertainment: false,
    };

    this.food = this.food.bind(this);
    this.entertainment = this.entertainment.bind(this);
    // this.handleInput = this.handleInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {
    return (
      <div>
        <div className="bg-light py-3">
          { this.renderSubmit() }
        </div>
        <div className="bg-light py-4">
          { this.renderFilters() }
        </div>
        <div className="container py-5">
          <section className="index-businesses">
            <div className="card-deck">
              { this.renderBusinesses() }
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  renderBusinesses() {
    return this.props.businesses.map((biz, i) => {
      return (
        <Business
          key={ i }
          name={ biz.name }
          desc={ biz.desc }
        />
      );
    });
  }
  
  renderSubmit() {
    return (
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col">
            <NewBusinessModal />
          </div>
          <div className="col text-right">
            <p className="mb-0">Hello, <u>admin</u></p>
          </div>
        </div>
      </div>
    );
  }

  renderFilters() {
    return (
      <fieldset>
        <legend>Choose some monster features</legend>

        <div>
        <input type="checkbox" id="scales" name="feature"
               value="scales" checked />
        <label for="scales">Scales</label>
        </div>

        <div>
        <input type="checkbox" id="horns" name="feature"
               value="horns" />
        <label for="horns">Horns</label>
        </div>

        <div>
        <input type="checkbox" id="claws" name="feature"
               value="claws" />
        <label for="claws">Claws</label>
        </div>

      </fieldset>
    );
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('businesses');
  Meteor.subscribe('submissions');
  
  return {
    businesses: Businesses.find({ verified: true }).fetch(),
    submissions: Submissions.find({ }).fetch(),
  };
})(Index);
