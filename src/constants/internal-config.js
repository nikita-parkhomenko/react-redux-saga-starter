
// outsource dependencies
import _ from 'lodash';

// local dependencies

const environment = {
  SID: varString(process.env.REACT_APP_SID),
  NAME: varString(process.env.REACT_APP_NAME),
  DEBUG: varBoolean(process.env.REACT_APP_DEBUG),
  VERSION: varString(process.env.REACT_APP_VERSION),
  PRODUCTION: varBoolean(process.env.REACT_APP_PRODUCTION),
  SERVICE_URL: varString(process.env.REACT_APP_SERVICE_URL),
  // Message Broker
  BROKER_SOCKET_URL: varString(process.env.REACT_APP_BROKER_SOCKET_URL),
  BROKER_SERVICE_URL: varString(process.env.REACT_APP_BROKER_SERVICE_URL),
  // s3
  CLOUD_AWS_BUCKET: varString(process.env.REACT_APP_CLOUD_AWS_BUCKET),
};

// NOTE addition ability to enable debugging
!environment.DEBUG && (environment.DEBUG = /show_DJEMA_DEBUG/.test(window.location.href));
// NOTE log config in debug mode at app starting
environment.DEBUG && console.info('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n sid:', environment.SID
  , '\n config:', environment
);
/*
 * config is a function which allow to define defaults
 * @param {String} prop
 * @param {Any} defaults
 */
export const config = (prop, defaults) => _.get(environment, prop, defaults);
config.all = () => Object.assign({}, environment);
/******************************************************
 *            variables parsers
 *****************************************************/
function varBoolean (value) {
  return /^(true|1)$/i.test(value);
}
// function varNumber (value) {
//   return parseFloat(value) || void 0;
// }
// function varArray (value) {
//   return value ? value.split(',') : void 0;
// }
function varString (value) {
  return /^(null|undefined)$/i.test(value) ? void 0 : value;
}
