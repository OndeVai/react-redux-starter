import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../_global/TextInput';
import AuthorSelect from '../../author/AuthorSelect';
import DataForm from '../../_global/data-form/DataForm';

const CourseForm = ({
                      course, allAuthors, onSave, validationRules,
                      saving, authorsLoading
                    }) => {

  return (
    <DataForm title="Manage Course"
              onSave={onSave}
              saving={saving}
              validationRules={validationRules}
              dataItem={course}>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            name="title"
            label="Title"/>
          <AuthorSelect
            name="authorId"
            authors={allAuthors}
            loading={authorsLoading}/>
        </div>
        <div className="col-md-6">
          <TextInput
            name="category"
            label="Category"/>
          <TextInput
            name="length"
            label="Length"/>
        </div>
      </div>
    </DataForm>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object,
  courseNotFoundMsg: PropTypes.string,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  authorsLoading: PropTypes.bool.isRequired,
  validationRules: PropTypes.object.isRequired
};

export default CourseForm;
