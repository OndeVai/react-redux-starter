import React from 'react';
import PropTypes from 'prop-types';
import loadingImg from './Loader.svg';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <img src={loadingImg} alt="loading..."/>
    </div>
  );
};


export default Loader;
