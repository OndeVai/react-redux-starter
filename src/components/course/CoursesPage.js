import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.loadCourses();
  }

  render() {
    const {courses} = this.props;

    return (
      <CourseList courses={courses}/>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  apiError: PropTypes.object
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    apiError: state.apiError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
