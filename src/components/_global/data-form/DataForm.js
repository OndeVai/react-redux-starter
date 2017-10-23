import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from '../../../_utils/debounce';
import validate from '../../../_utils/validate';
import Loader from '../loader/Loader';
import './DataForm.scss';

class DataForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dataItem: null,
      errors: {}
    };

    this.formIsValid = this.formIsValid.bind(this);
    this.updateStateFromFormChange = this.updateStateFromFormChange.bind(this);
    this.customOnChange = this.customOnChange.bind(this);
    this.onAfterChangeDebounced = this.onAfterChangeDebounced.bind(this);
    this.save = this.save.bind(this);

    this.validate = validate(this.props.validationRules);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataItem !== this.props.dataItem) {
      this.setState({dataItem: nextProps.dataItem});
    }
  }

  updateStateFromFormChange(event) {
    const field = event.target.name;
    let dataItem = Object.assign({}, this.state.dataItem);
    dataItem[field] = event.target.value;
    this.setState({dataItem: dataItem});
  }

  formIsValid(event) {

    const {dataItem, errors} = this.state;
    const fieldName = event ? event.target.name : null;

    const validationResults =
      this.validate(dataItem, errors, fieldName);

    this.setState({errors: validationResults.errors});
    return validationResults.isValid;
  }

  save(event) {
    event.preventDefault();

    if (!this.formIsValid()) {
      return;
    }

    this.props.onSave(this.state.dataItem);
  }

  recursiveCloneChildren(children, customOnChange, dataItem, errors) {
    return React.Children.map(children, child => {
      const childPropTypes = child.type.propTypes;
      let childProps = Object.assign({}, child.props);
      if(childPropTypes
        && childPropTypes['onChange']
        && childPropTypes['value']
        && childPropTypes['error']) {
        childProps = Object.assign({}, childProps,
          {
            onChange: customOnChange,
            value: dataItem[child.props.name],
            error: errors[child.props.name]
          });
      }
      childProps.children =
        this.recursiveCloneChildren(child.props.children, customOnChange, dataItem, errors);
      return React.cloneElement(child, childProps);
    });
  }

  onAfterChangeDebounced(event){
    event.persist();
    debounce((event) => {
      this.formIsValid(event);
    }, 500)(event);
  }

  customOnChange(event){
    this.updateStateFromFormChange(event);
    this.onAfterChangeDebounced(event);
  }

  render() {
    const {dataItem, errors} = this.state;

    if (!dataItem) {
      return null;
    }

    const {saving, children, title} = this.props;
    const customOnChange = this.customOnChange;

    let childrenWithFieldsHookedUp =
      this.recursiveCloneChildren(children,customOnChange,dataItem,errors);
    const saveLoader = saving ? <Loader/> : null;
    return (
      <div className="data-form">
        <h1>{title}</h1>
        <form onSubmit={this.save}>
          {childrenWithFieldsHookedUp}
          <div className="toolbar">
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save'}
              className="btn btn-primary"/>
            {saveLoader}
          </div>
        </form>
      </div>
    );
  }
}

DataForm.propTypes = {
  saving: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onSave: PropTypes.func.isRequired,
  dataItem: PropTypes.object,
  validationRules: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};


export default DataForm;
