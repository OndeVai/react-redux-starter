import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const CourseList = ({courses}) => {

  if (!courses.length) {
    return null;
  }

  return (
    <div className="course-list-results">
      <h1>Courses</h1>
      <table className="table">
        <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
        </thead>
        <tbody>
        {courses.map(course =>
          <tr key={course.id}>
            <th><a href={course.watchHref} target="_blank">Watch</a></th>
            <th><Link to={'/course/' + course.id}>{course.title}</Link></th>
            <th>{course.authorId}</th>
            <th>{course.category}</th>
            <th>{course.length}</th>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};


CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseList;
