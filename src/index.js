import React, { Component } from 'react';
//import createRoutes from './Routes';
import './config/ReactotronConfig';
import AsyncStorage from '@react-native-community/async-storage';
import Rotas from './leo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import Splash from './Splash';

const store = createStore(Reducers, applyMiddleware(ReduxThunk));
class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Splash />
      </Provider>
    );
  }
}

export default App;
