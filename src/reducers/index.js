import { combineReducers } from 'redux'; 
import AuthReducer from './AuthReducer';
import DetalhesReducer from './DetalhesReducer'

const Reducers = combineReducers({
   auth: AuthReducer,
   Detalhes: DetalhesReducer
});

export default Reducers;
