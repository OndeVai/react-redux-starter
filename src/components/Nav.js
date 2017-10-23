import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse';

const Nav = () => {

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <a className="navbar-brand" href="#">PRCA</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
              <li><NavLink activeClassName="active" to="/about">About</NavLink></li>
              <li><NavLink activeClassName="active" to="/courses">Courses</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    );
};

Nav.propTypes = {
    //myProp: PropTypes.object.isRequired
};

Nav.defaultProps = {
    //myProp: <defaultValue>
};

export default withRouter(Nav);
