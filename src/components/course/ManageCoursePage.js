import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseForm from './course-form/CourseForm';

const courseValidationRules = {
  title: course => {
    return course.title.length >= 5 ?
      null : 'Title must be at least 5 characters.';
  },
  authorId: course => {
    return course.authorId ?
      null : 'Author is required.';
  }
};

export class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      redirectUrl: null
    };
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentDidMount() {
    this.loadCourse();
  }

  loadCourse() {
    this.props.courseActions.loadCourse(this.props.match.params.id);
    this.props.authorActions.loadAuthors();
  }

  saveCourse(course) {

    this.props.courseActions.saveCourse(course)
      .then(() => this.redirect('/courses', `Course "${course.title}" saved`));
  }

  redirect(url, toastMessage) {
    if (toastMessage)
      toastr.success(toastMessage);
    this.setState({redirectUrl: url});
  }

  render() {

    const {redirectUrl} = this.state;

    if (redirectUrl) {
      return (<Redirect to={redirectUrl}/>);
    }

    const {
      authors, authorsLoading,
      courseSaving, course
    } = this.props;

    return (
      <CourseForm
        authorsLoading={authorsLoading}
        saving={courseSaving}
        allAuthors={authors}
        onSave={this.saveCourse}
        course={course}
        validationRules={courseValidationRules}/>
    );
  }
}


ManageCoursePage.propTypes = {
  course: PropTypes.object,
  courseActions: PropTypes.object.isRequired,
  authorActions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  authorsLoading: PropTypes.bool.isRequired,
  courseSaving: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  apiError: PropTypes.object
};

function mapStateToProps(state) {
  return {
    course: state.course,
    courseLoading: state.loading,
    courseSaving: state.courseSaving,
    authors: state.authors,
    authorsLoading: state.authorsLoading,
    apiError: state.apiError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
    authorActions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
