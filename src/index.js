import React, { Component } from 'react';
import Routes from './Routes';
import './config/ReactotronConfig';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import Teste from './teste';

const store = createStore(Reducers, applyMiddleware(ReduxThunk));
class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
