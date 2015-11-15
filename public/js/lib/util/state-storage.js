import rison from 'rison';

import * as actionTypes from 'lib/constants/action-types';


export class StateStorage {

  constructor() {
    this.stateVersion = 1;
    this.storageKey = 'music-arranger';
    this.isListeningToPopState = false;
  }

  restoreState() {
    // when the saved version is older than the application version
    // I guess maybe we could either
    // 1) throw away the old state
    // 2) try to migrate the old format to the new format

    let savedState;
    let stateQuery = window.location.search.match(/\?s=(.+)/);
    if (stateQuery) {
      console.log('restoring state from query string');
      savedState = decodeURIComponent(stateQuery[1]);
    } else {
      savedState = window.localStorage.getItem(this.storageKey);
      if (savedState) {
        console.log('restoring state from localStorage');
      }
    }
    if (savedState) {
      savedState = this.decodeState(savedState);
      if (!savedState) {
        return;
      }
      console.log('loading saved state at version', savedState.version);
      return savedState.state;
    }
  }

  saveState({dispatch, state}) {
    var encodedState = this.encodeState(state);
    window.localStorage.setItem(this.storageKey, encodedState);
    this.pushState({state, encodedState, dispatch});
  }

  encodeState(state) {
    return rison.encode({
      version: this.stateVersion,
      state: state,
    });
  }

  decodeState(encodedState) {
    try {
      return rison.decode(encodedState);
    } catch(e) {
      console.error('could not decode state from localStorage:', e);
      return;
    }
  }

  pushState({state, encodedState, dispatch}) {
    if (window.history && window.history.pushState) {
      window.history.pushState(
        state, '',
        window.location.pathname + '?s=' + encodedState);
      if (!this.isListeningToPopState) {
        this.listenToPopState(dispatch);
      }
      if (window.location.href.length > 2083) {
        // Really, this is just a problem in IE but perhaps some upstream
        // proxies would have issues as well (like GitUHub's CDN maybe,
        // just a guess)
        console.warn('this URL may not load in some browsers');
      }
    } else {
      console.log('history.pushState is not available');
    }
  }

  listenToPopState(dispatch) {
    window.addEventListener('popstate', (e) => {
      dispatch({
        type: actionTypes.RESTORE_STATE,
        state: e.state,
      });
    });
    this.isListeningToPopState = true;
  }
}


var stateStorage = new StateStorage();
export default stateStorage;
