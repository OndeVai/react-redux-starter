import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Rodeo SPA Prototype</h1>
        <p>Welcome to the prototype</p>
        <Link to="about" className="btn btn-primary btn-large">About</Link>
      </div>
    );
  }
}

export default HomePage;
