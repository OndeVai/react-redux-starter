/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './redux/store/configureStore.dev';
import {Provider} from 'react-redux';
import App from './components/App';
import './_third-party/bootstrap-custom.scss';
import './_third-party/toastr.scss';

const store = configureStore();


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
