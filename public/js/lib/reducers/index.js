import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as controls } from './controls';
import { default as arrangement } from './arrangement';
import { default as pianoView } from './piano-view';


const rootReducer = combineReducers({
  app,
  controls,
  arrangement,
  pianoView,
});

export default rootReducer;
