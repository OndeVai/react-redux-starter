import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class NotFoundPage extends React.Component {
  render() {
    const {backUrl, backUrlMsg, msg} = this.props;
    return (
      <div>
        <h1>Not found!</h1>
        <p><em><strong>{msg}</strong></em></p>
        <div>
          <Link className="btn btn-primary" to={backUrl}>{backUrlMsg}</Link>
        </div>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  backUrl: PropTypes.string.isRequired,
  backUrlMsg: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired
};

NotFoundPage.defaultProps = {
  backUrl: '/',
  backUrlMsg: 'Return to home',
  msg: 'The page you were looking for was not found.'
};


export default NotFoundPage;
