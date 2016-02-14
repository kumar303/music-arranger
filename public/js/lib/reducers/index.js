import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as controls } from './controls';
import { default as arrangement } from './arrangement';


const rootReducer = combineReducers({
  app,
  controls,
  arrangement,
});

export default rootReducer;
