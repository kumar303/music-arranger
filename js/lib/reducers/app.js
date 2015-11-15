import * as actionTypes from 'lib/constants/action-types';


export const initialAppState = {
  error: null,
};


export default function app(state, action) {
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return initialAppState;
    case actionTypes.RESTORE_STATE:
      return action.state.app;
    case actionTypes.APP_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state || initialAppState;
  }
}
