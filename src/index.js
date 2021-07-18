import React, { Component } from 'react';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import { LogBox } from 'react-native';

const store = createStore(Reducers, applyMiddleware(ReduxThunk));
class App extends Component {
  render() {
    LogBox.ignoreAllLogs(false);
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
