import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as apiStatusActions from '../../redux/actions/apiStatusActions';
import * as apiErrorTypes from '../../api/apiErrorTypes';
import Loader from './loader/Loader';

const errorRoute = '/error';

class ApiCallStatus extends Component {

  componentWillReceiveProps(nextProps) {
    const {location, apiStatusActions} = this.props;
    if (location !== nextProps.location) {
      apiStatusActions.clearError();
    }
    const {apiError} = nextProps;
    if(apiError) {
      if (apiError.type == apiErrorTypes.ERROR_400) {
        toastr.error(apiError.message);
        apiStatusActions.clearError();
      }
    }
  }


  render() {

    const {apiError, location, loading} = this.props;

    if (loading) {
      return <Loader/>;
    }

    if (location.pathname !== errorRoute && apiError) {

      const errorType = apiError.type;
      if(errorType && errorType !== apiErrorTypes.ERROR_400) {
        return (
          <Redirect to={{
            pathname: errorRoute,
            state: {
              fromErrorRoute: location,
              apiError
            }
          }}/>
        );
      }
    }

    return null;
  }
}

ApiCallStatus.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  apiStatusActions: PropTypes.object.isRequired,
  apiError: PropTypes.object,
  loading: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    apiError: state.apiError,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiStatusActions: bindActionCreators(apiStatusActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApiCallStatus));
