import * as actionTypes from 'lib/constants/action-types';


export const initialAppState = {
  error: null,
  status: null,
};


export default function app(state, action) {
  switch (action.type) {
    case actionTypes.APP_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });
    case actionTypes.SET_STATUS:
      return Object.assign({}, state, {
        status: action.status,
      });
    default:
      return state || initialAppState;
  }
}
