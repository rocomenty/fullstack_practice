import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
it('renders without crashing', () => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
  );
});