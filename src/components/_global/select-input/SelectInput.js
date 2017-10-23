import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';
import './SelectInput.scss';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options, loading}) => {
  let wrapperClass = 'form-group select-input';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }
  const loader = loading ? <Loader/> : null;
  return (
    <div className={wrapperClass}>
      <label className="control-label" htmlFor="{name}">{label}</label>
      <select
        disabled={loading}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control">
        <option value="">{defaultOption}</option>
        {options.map((option) => {
          return <option key={option.value} value={option.value}>{option.text}</option>;
        })}
      </select>
      {loader}
      {error && <span className="help-block text-danger">{error}</span>}
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
};

SelectInput.defaultProps = {
  loading: false
};



export default SelectInput;
