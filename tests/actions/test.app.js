import { expect } from 'chai';

import * as actionTypes from 'lib/constants/action-types';
import * as appActions from 'lib/actions/app';


describe('appError', function() {

  it('should dispatch an error', function() {
    let action = appActions.appError('Some error');
    expect(action).to.be.deep.equal({
      type: actionTypes.APP_ERROR,
      error: 'Some error',
    });
  });

});


describe('showStatus', function() {
  var fakeDispatch;

  beforeEach(() => {
    fakeDispatch = sinon.stub();
  });

  it('should dispatch system status', done => {
    const data = {
      status: 'running',
    };
    let fakeResponse = {
      json: () => new Promise((resolve) => {
        resolve(data);
      }),
    };
    let fakeFetch = () => new Promise((resolve) => {
      resolve(fakeResponse);
    });

    let action = appActions.showStatus({apiFetch: fakeFetch});
    action(fakeDispatch)
      .then(() => {
        expect(fakeDispatch.firstCall.args[0]).to.be.deep.equal({
          type: actionTypes.SET_STATUS,
          status: data.status,
        });
        done();
      })
      .catch(done);
  });

  it('should dispatch an error on bad response', done => {
    let error = new Error('some error');
    let fakeFetch = () => new Promise((resolve, reject) => {
      reject(error);
    });

    let action = appActions.showStatus({apiFetch: fakeFetch});
    action(fakeDispatch)
      .then(() => {
        let msg = fakeDispatch.firstCall.args[0];
        expect(msg.type).to.be.equal(actionTypes.APP_ERROR);
        expect(msg.error).to.include(error.message);
        done();
      })
      .catch(done);
  });

});
