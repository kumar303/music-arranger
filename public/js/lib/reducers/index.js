import { combineReducers } from 'redux';

import { default as app } from './app';


const rootReducer = combineReducers({
  app,
});

export default rootReducer;
