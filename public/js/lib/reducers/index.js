import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as appControls } from './app-controls';
import { default as pianoView } from './piano-view';


const rootReducer = combineReducers({
  app,
  appControls,
  pianoView,
});

export default rootReducer;
