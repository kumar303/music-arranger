import { expect } from 'chai';

import * as actionTypes from 'lib/constants/action-types';
import appReducer from 'lib/reducers/app';
import { initialAppState } from 'lib/reducers/app';


describe('App Reducer', function() {

  it('should store an error', function() {
    var app = appReducer(initialAppState, {
      type: actionTypes.APP_ERROR,
      error: 'Some error',
    });
    expect(app.error).to.be.equal('Some error');
  });

});
