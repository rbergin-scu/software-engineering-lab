import React from 'react';

import { Col, FormGroup, Label, } from 'reactstrap';

import Submissions from '/imports/api/submissions/submissions';

export default class InputField extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <FormGroup row={ this.props.isColumn === undefined ? true : !this.props.isColumn }>
        <Label for={ this.props.name } sm={ 3 }>{ Submissions.schema.label(this.props.name) }</Label>
        <Col sm={ 9 }>
          
          { ['email', 'file', 'tel', 'text'].includes(this.props.type) &&
          <input name={ this.props.name }
                 onChange={ this.props.handle }
                 placeholder={ this.props.placeholder }
                 required={ this.props.required }
                 type={ this.props.type }
                 defaultValue={ this.props.value }
                 className={ `form-control mb-2 ${this.props.error && 'border-warning'}` } />
          }
          
          { ['textarea'].includes(this.props.type) &&
          <textarea name={ this.props.name }
                    onChange={ this.props.handle }
                    required={ this.props.required }
                    rows={ 5 }
                    defaultValue={ this.props.value }
                    className="form-control mb-2" />
          }
          
          { ['select'].includes(this.props.type) &&
          <select name={ this.props.name }
                  onChange={ this.props.handle }
                  defaultValue={ this.props.value ? this.props.value : this.props.options[0] }
                  className="form-control mb-2">
            { Object.entries(this.props.options).map(([key, value], i) => {
              return <option key={ i } value={ key }>{ value }</option>
            }) }
          </select>
          }
          
          { this.props.error && <span className="text-sans-bold text-warning">{ this.props.error }.</span> }
          
        </Col>
      </FormGroup>
    )
  }
  
}
