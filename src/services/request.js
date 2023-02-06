
// outsource dependencies
import qs from 'qs';
import _ from 'lodash';
import axios from 'axios';

// local dependencies
import { config } from '../constants/internal-config';
import { AccessTokenStorage, RefreshTokenStorage } from './storage';

const AUTH_HEADER = 'Authorization';
const API_PATH = config('SERVICE_URL', null);
const API_BROKER_PATH = config('BROKER_SERVICE_URL', null);
const getAuthHeader = () => `Bearer ${AccessTokenStorage.get()}`;

/**
 * Expected session schema
 * @typedef Session
 * @type {object}
 * @property {string} accessToken - access token string.
 * @property {string} refreshToken - refresh token string.
 * @property {number} responseCode
 * @property {string} responseMessage
 */
/**
 * update session in storage
 * @param {Session} [session=null]
 */
const updateStoredSession = session => {
  if (_.get(session, 'accessToken', null)) {
    AccessTokenStorage.set(session.accessToken);
    RefreshTokenStorage.set(session.refreshToken);
  } else {
    AccessTokenStorage.remove();
    RefreshTokenStorage.remove();
  }
};
/**
 * provide correct way to restore session
 */
const restoreSessionFromStore = () => !hasStoredSession()
  ? [API, API_BROKER].map(API => API.defaults.headers[AUTH_HEADER] = void(0))
  : ([API, API_BROKER].map(API => API.defaults.headers[AUTH_HEADER] = getAuthHeader()));

/**
 * provide correct way to setup authorization session
 *
 * @param {Session} [session=null] to kill session within instanceAPI
 */
const setupSession = session => {
  updateStoredSession(session);
  restoreSessionFromStore();
};
/**
 * common way to know session state
 * @return {Boolean}
 */
const hasStoredSession = () => Boolean(AccessTokenStorage.get());

/**
 * override query serializer to define array Format as API needed
 *
 * @param {Object} options
 * @returns {String}
 */
const paramsSerializer = options => qs.stringify(options, { arrayFormat: 'repeat', encode: false });

/**
 * prepare error
 *
 * @param {Object} error
 * @return {Promise}
 */
const prepareError = error => {
  error = {
    // axiosError: error,
    path: _.get(error, 'config.url', null),
    response: _.get(error, 'response.data', null),
    status: _.get(error, 'response.status', null),
    requestData: _.get(error, 'config.data', null),
    method: _.get(error, 'config.method', 'CODE_NULL'),
    requestParams: _.get(error, 'config.params', null),
    errorCode: _.get(error, 'response.data.errorCode', null),
  };
  if (config('DEBUG', false)) {
    console.warn('%c Interceptor: ', 'background: #EC1B24; color: #fff; font-size: 14px;', error);
  }
  const message = getMessage([error.errorCode], error.response ? 'CODE_NULL' : 'CROSS_DOMAIN_REQUEST');
  return Promise.reject({ ...error, message });
};

/**
 * Axios instance prepared for app with authorization
 * contain logic for working with authorization and 401 interceptor
 */
const API = axios.create({
  paramsSerializer,
  baseURL: API_PATH,
  withCredentials: false,
  headers: {
    // 'Cache-Control': 'no-cache', // not allowed by CORS
    'Content-Type': 'application/json',
  },
});

/**
 * setup interceptors
 * sync check to known is user logged in
 * NOTE to known more {@link https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c | axios-interceptors-refresh-token}
 */
API.interceptors.response.use(
  response => _.get(response, 'data', null),
  error => ((
    hasStoredSession()
    && error.request.status === 401
    // NOTE support request may get 401 (JAVA Spring is fucking genius ...) we must skip restoring for that case
    && !/sign-out|\/oauth\/token/.test(error.config.url)
  ) ? handleRefreshSession(error) : prepareError(error))
);

/**
 * Axios instance for BROKER prepared for app with authorization
 * contain logic for working with authorization and 401 interceptor
 */
const API_BROKER = axios.create({
  paramsSerializer,
  baseURL: API_BROKER_PATH,
  withCredentials: false,
  headers: {
    // 'Cache-Control': 'no-cache', // not allowed by CORS
    'Content-Type': 'application/json',
  },
});

/**
 * setup interceptors for BROKER
 * sync check to known is user logged in
 * NOTE to known more {@link https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c | axios-interceptors-refresh-token}
 */
API_BROKER.interceptors.response.use(
  response => _.get(response, 'data', null),
  error => ((
    hasStoredSession()
    && error.request.status === 401
    // NOTE support request may get 401 (JAVA Spring is fucking genius ...) we must skip restoring for that case
    && !/sign-out|\/oauth\/token/.test(error.config.url)
  ) ? handleRefreshSession(error) : prepareError(error))
);

/**
 * local variables to correctness refreshing session process
 */
let isRefreshing = false, stuckRequests = [];
/**
 * store all requests with 401 refresh session and try send request again
 *
 * @param {Object} error
 * @return {Promise}
 */
const handleRefreshSession = error => {
  const { config } = error;
  if (!isRefreshing) {
    isRefreshing = true;
    API.defaults.headers[AUTH_HEADER] = void(0);
    // TODO refresh token flow
    API.post('/auth/token/refresh', { refreshToken: RefreshTokenStorage.get() })
      .then(session => {
        setupSession(session);
        // NOTE resend all
        stuckRequests.map(({ config, resolve, reject }) => {
          // NOTE setup new authentication header in old request config
          config.headers[AUTH_HEADER] = getAuthHeader();
          API(config).then(resolve).catch(reject);
          // NOTE "array-callback-return"
          return null;
        });
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      })
      .catch(() => {
        // NOTE reject all
        stuckRequests.map(({ error, reject }) => reject(error));
        // NOTE provide ability to handle this situation
        authFail(error);
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      });
  }
  // NOTE determine first trying to restore session
  if (!config.wasTryingToRestore) {
    return new Promise((resolve, reject) => {
      config.wasTryingToRestore = true;
      stuckRequests.push({ config, error, resolve, reject });
    });
  }
  return prepareError(error);
};
/*******************************************************
 *              Predefined calls
 *******************************************************/
/**
 * Way to notify app about unexpected losing of session
 * @param fn
 * @return {*}
 */
const onAuthFailApplicationAction = fn => authFail = fn;
let authFail = error => console.warn('authorization is fail. Expected to override this action');
/**
 * checking API health state
 */
const checkAPIHealth = () => API({ url: '/actuator/health', method: 'GET' });
/**
 * getting logged user
 */
const getSelf = () => API({ url: '/users/self', method: 'GET' });
/**
 * Sign In flow using regular email
 */
const signIn = data => API({
  url: '/auth/token',
  method: 'POST',
  data
}).then(session => {
  setupSession(session);
  return getSelf();
});
/**
 * Sign up flow using regular email
 */
const signUp = payload => API({
  url: '/users',
  method: 'POST',
  data: {
    email: _.get(payload, 'email'),
    password: _.get(payload, 'password'),
  }
}).then(session => {
  setupSession(session);
  return getSelf();
});
/**
 * Sign Out flow
 */
const signOut = () => {
  setupSession(null);
  return API({ url: '/TODO', method: 'GET' });
};
/**
 * Restoring previously logged in user from local storage if it was
 */
const restoreUserFromStore = () => {
  if (hasStoredSession()) {
    restoreSessionFromStore();
    return getSelf();
  }
  setupSession(null);
};
/******************************************************************
 *           format of ERRORS
 ******************************************************************/
/**
 * try to find explanation of error in specification
 *
 * @param {String[]|String} errors
 * @param {String} [defMessage=null]
 */
function getMessage (errors, defMessage) {
  // NOTE check and setup default message
  if (!_.isString(defMessage)) {
    defMessage = getMessage('UNKNOWN_ERROR', 'Some thing went wrong ...');
  } else {
    defMessage = ERROR_MESSAGE[defMessage] ? ERROR_MESSAGE[defMessage] : defMessage;
  }
  // NOTE try to get message from specification
  let message = '';
  if (_.isArray(errors)) {
    message = errors.map(e => getMessage(e, defMessage)).join(', ');
  } else if (errors) {
    message = ERROR_MESSAGE[errors];
  }
  return message || defMessage;
}

const ERROR_MESSAGE = {
  CODE_NULL: 'Unexpected Error ¯\\(ヅ)/¯',
  NESTED_EXCEPTION: 'Unknown Error from nested Service',
  UNKNOWN_ERROR: 'Some thing went wrong ...',
  CROSS_DOMAIN_REQUEST: 'Cross domain request not allowed !',
  FORBIDDEN: 'Access is denied. ᕦ(ツ)ᕤ',
  404: '404: Resources not found ᕦ(ツ)ᕤ',
  NOT_IMPLEMENTED: 'Functionality currently unavailable ¯\\(ヅ)/¯',
};
// NOTE a bit prepared API helpers
Object.assign(API, {
  signIn,
  signUp,
  getSelf,
  signOut,
  setupSession,
  checkAPIHealth,
  hasStoredSession,
  restoreUserFromStore,
  restoreSessionFromStore,
  onAuthFailApplicationAction
});
// NOTE named export only after all prepare thing
export { API, API_BROKER };
