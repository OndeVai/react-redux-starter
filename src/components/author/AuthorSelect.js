import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../_global/select-input/SelectInput';

function formatAuthors(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    };
  });
}

const AuthorSelect = ({authors, error, loading, onChange, value}) => {
  return (
    <SelectInput
      name="authorId"
      label="Author"
      value={value}
      defaultOption="Select Author"
      options={formatAuthors(authors)}
      onChange={onChange}
      error={error}
      loading={loading}/>
  );
};

AuthorSelect.propTypes = {
  authors: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default AuthorSelect;
