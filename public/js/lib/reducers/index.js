import { combineReducers } from 'redux';

import { default as app } from './app';
import { default as pianoView } from './piano-view';


const rootReducer = combineReducers({
  app,
  pianoView,
});

export default rootReducer;
