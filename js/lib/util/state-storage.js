import rison from 'rison';

const stateVersion = 1;
const storageKey = 'music-arranger';


export function restoreState() {
  let savedState = window.localStorage.getItem(storageKey);
  if (savedState) {
    // when the saved version is older than the application version
    // I guess maybe we could either
    // 1) throw away the old state
    // 2) try to migrate the old format to the new format
    try {
      savedState = rison.decode(savedState);
    } catch(e) {
      console.error('could not decode state from localStorage:', e);
      return;
    }
    console.log('loading saved state at version', savedState.version);
    return savedState.state;
  }
}


export function saveState(state) {
  window.localStorage.setItem(storageKey, rison.encode({
    version: stateVersion,
    state: state,
  }));
}
