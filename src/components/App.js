import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import HomePage from './home/HomePage';
import CoursesPage from './course/CoursesPage';
import AboutPage from './about/AboutPage';
import ManageCoursePage from './course/ManageCoursePage';
import NotFoundPage from './errors/NotFoundPage';
import ErrorPage from './errors/ErrorPage';
import ApiCallStatus from './_global/ApiCallStatus';
import Nav from './Nav';
import './App.scss';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Nav/>
          <div className="container">
            <ApiCallStatus/>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/error" component={ErrorPage}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/courses" component={CoursesPage}/>
              <Route path="/course/:id" component={ManageCoursePage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  apiError: PropTypes.object
};


export default App;
