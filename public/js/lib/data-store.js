import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import stateStorage from 'lib/util/state-storage';
import rootReducer from './reducers';


function logger({ getState }) {
  return next => action => {
    console.info('redux: dispatching', action);
    const result = next(action);
    console.log('redux: state after', getState());
    return result;
  };
}


var storeParts = [
  applyMiddleware(thunk, logger),
];

if (module.hot) {
  console.log('Adding redux dev-tools to data store');
  let persistState = require('redux-devtools').persistState;
  let DevTools = require('lib/components/dev-tools');

  storeParts.push(DevTools.instrument());
  storeParts.push(persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  ));
}

const finalCreateStore = compose(...storeParts)(createStore);


export function createReduxStore() {
  const store = finalCreateStore(rootReducer, stateStorage.restoreState());

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // See: https://github.com/rackt/react-redux/releases/tag/v2.0.0
    module.hot.accept('lib/reducers', () => {
      const nextRootReducer = require('lib/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default createReduxStore();
