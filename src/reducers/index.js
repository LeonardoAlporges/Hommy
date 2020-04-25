import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DetalhesReducer from './DetalhesReducer';
import UserReducer from './UserReducer';
import CaronaReducer from './CaronaReducer';

const Reducers = combineReducers({
  auth: AuthReducer,
  Detalhes: DetalhesReducer,
  user: UserReducer,
  carona: CaronaReducer,
});

export default Reducers;
