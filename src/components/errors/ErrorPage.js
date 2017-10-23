import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as apiErrorTypes from '../../api/apiErrorTypes';

class ErrorPage extends Component {

  constructor(props, context) {
    super(props, context);

  }

  render() {
    const {location} = this.props;
    const locState = location.state;
    const backUrl = locState && locState.fromErrorRoute ? locState.fromErrorRoute.pathname : '/';
    const errorMessage = locState && locState.apiError ? locState.apiError.message : '(none)';
    const errorType = locState && locState.apiError ? locState.apiError.type : '(none)';
    const is404 = errorType && errorType === apiErrorTypes.ERROR_404;
    const errorClass =
      `alert alert-${is404 ? 'warning' : 'danger'}`;
    const errorSubMessage = is404 ? null : (<p>An error happened behind the scenes...</p>);
    return (
      <div>
        <h1>Whoops!</h1>
        <div className={errorClass}>
          {errorSubMessage}
          <p>Details: <em>{errorMessage}</em></p>
        </div>
        <Link to={backUrl} className="btn btn-info">
          Go back to last page
        </Link>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  location: PropTypes.object.isRequired
};

export default ErrorPage;
