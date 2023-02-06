
// outsource dependencies
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, delay, call, select } from 'redux-saga/effects';

// local dependencies
import { silence, API } from '../services';
import { USER_STATE, APP_TITLE, history } from '../constants';

// configure
const ACTIVATED_STATES = [USER_STATE.ACTIVE, USER_STATE.PENDING_ARTIST];

export const appRootCtrl = create({
  prefix: 'app',
  actions: {
    signOut: 'SIGN_OUT',
    initialize: 'INITIALIZE',
    authorized: 'AUTHORIZED',
    appWarning: 'APP_WARNING',
    unauthorized: 'UNAUTHORIZED',
  },
  initial: {
    initialized: false,             // prevent redirect from page and show instead current page - global preloader
    health: true,                   // prevent redirect from page and show instead current page and it behavior - maintenance page
    user: null,                     // logged user information
  },
  subscriber: function * () {
    yield takeEvery(appRootCtrl.action.signOut.TYPE, silence, signOutSaga);
    yield takeEvery(appRootCtrl.action.appWarning.TYPE, silence, appWarningSaga);
    yield takeEvery(appRootCtrl.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(appRootCtrl.action.authorized.TYPE, silence, authorizedSaga);

    // connect nested sagas
  }
});

function * initializeSaga ({ type, payload }) {
  try {
    yield delay(400);
    // NOTE: check health of API
    const { status } = yield call(API, { method: 'GET', url: '/actuator/health' });
    if (status !== 'UP') { throw new Error('API down for maintenance'); }
    yield put(appRootCtrl.action.updateCtrl({ health: true }));
  } catch ({ message: error1 }) {
    yield put(appRootCtrl.action.updateCtrl({ health: false }));
    // NOTE try again after delay
    yield delay(10 * 1000);
    yield put(appRootCtrl.action.initialize({}));
    return;
  }

  const hasSession = yield call(API.hasStoredSession);
  // NOTE: try to restore user auth
  if (hasSession) {
    try {
      yield call(API.restoreSessionFromStore);
      yield call(getSelfSaga, {});
    } catch ({ message: error2 }) {
      yield call(signOutSaga, {});
    }
  }

  // NOTE: in case successfully restored self
  const { user } = yield select(appRootCtrl.select);
  if (user) {
    // NOTE: fire synthetic action to notify app modules
    yield put(appRootCtrl.action.authorized(user));
  }
  // NOTE: initialization done
  yield put(appRootCtrl.action.updateCtrl({ initialized: true }));
}

export function * getSelfSaga ({ type, payload }) {
  const user = yield call(API, { method: 'GET', url: '/users/self' });
  yield put(appRootCtrl.action.updateCtrl({ user }));
}

function * signOutSaga ({ type, payload }) {
  const { user: self } = yield select(appRootCtrl.select);

  // NOTE: clear client side session from store
  yield call(API.setupSession, null);
  // NOTE: use silence helper if you don't want to handle error
  yield call(silence, API, { method: 'POST', url: '/auth/logout', data: {} });
  // NOTE: remove logged user
  yield put(appRootCtrl.action.updateCtrl({ user: null }));
  // NOTE: fire synthetic action to notify app
  yield put(appRootCtrl.action.unauthorized(self));
}

function * authorizedSaga ({ type, payload }) {
  const { user: self } = yield select(appRootCtrl.select);
  yield delay(200);
  const userState = _.get(self, 'userState');
  if (!ACTIVATED_STATES.includes(userState)) {
    yield call(history.push, '/sign-up');
    return null;
  }
}

function * appWarningSaga ({ type, payload }) {
  const title = _.get(payload, 'title', APP_TITLE);
  const content = _.isString(payload) ? payload : _.get(payload, 'content', 'Warning!');
  // NOTE: show toastr
  yield call(toastr.warning, title, content);
}
