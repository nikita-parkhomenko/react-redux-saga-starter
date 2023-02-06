
// outsource dependencies
import _ from 'lodash';
import * as yup from 'yup';

// local dependencies
import { config } from './internal-config';

// configure
const OPT = { abortEarly: false, recursive: true };

/**
 * convert yup schema to redux-form sync validator
 * @param {YupSchema} schema
 * @return {function(*=): {}}
 */
export const createYupSyncValidator = schema => values => {
  try {
    schema.validateSync(values, OPT);
  } catch (error) {
    return convertYupErrorsToReduxFormSchema(error);
  }
  return {};
};

/**
 * convert yup schema to redux-form async validator
 * @param {YupSchema} schema
 * @return {function(*=): {}}
 */
export const createYupAsyncValidator = schema => async values => await schema
  .validate(values, OPT)
  .then(() => {})
  .catch(convertYupErrorsToReduxFormSchema);

/**
 * convert throwing yup errors to simple redux form object with schema of validation messages
 * @private
 */
const convertYupErrorsToReduxFormSchema = error => {
  // NOTE most simple way to know the yup was thrown ¯\_(ツ)_/¯
  if (_.get(error, 'name') !== 'ValidationError') {
    return config('DEBUG', false)
      && console.info('%c YUP Failed to validate ', 'color: #FF6766; font-weight: bolder; font-size: 16px;'
        , '\n name', _.get(error, 'name')
        , '\n message', _.get(error, 'message')
      );
  }
  const inner = _.get(error, 'inner');
  const result = {};
  _.map(inner, nestedError => {
    const path = _.get(nestedError, 'path');
    const inner = _.get(nestedError, 'inner');
    let message = _.get(nestedError, 'message');
    // NOTE allow deep form schema
    if (_.size(inner)) {
      message = convertYupErrorsToReduxFormSchema(nestedError);
    }
    _.set(result, path, message);
    // console.log('%c convertYupErrorsToReduxFormSchema ', 'color: blue; font-weight: bolder; font-size: 12px;'
    //   , '\n inner:', inner
    //   , '\n path:', path
    //   , '\n message:', message
    // );
  });
  return result;
};

/*******************************************************************
 *        Predefined reusable validators
 * take in mind the mandatory check better to add on the form itself
 *                      ¯\_(ツ)_/¯
 *******************************************************************/
const STRING = yup.string('Should be a string')
  .nullable()
  .strict();
  // @see {@link https://estative.atlassian.net/browse/EST-681}
  // .trim('Shouldn\'t contain whitespaces at start and end of text');

const NUMBER = yup.number().nullable().strict();

const DATE = yup.date().nullable().strict();

const ENTITY = yup.object().nullable();
// NOTE not working as expected => sync with redux-form array._error
const ENTITY_LIST = yup.array().nullable();

const POSITIVE = NUMBER.min(1, 'Should be positive');

const EMAIL = STRING.email('Please type valid email');

// eslint-disable-next-line no-useless-escape,max-len
export const urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w\-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
const URL = STRING.matches(urlRegExp, 'Please enter correct website url');
// NOTE allowed only youtube and facebook
const youtubeRed = 'https://youtu.be/';
const youtube = 'https://www.youtube.com/';
const facebook = 'https://www.facebook.com/publicfr/videos'; // NOTE public videos only
export const videoUrlRegExp = new RegExp(`(${youtube}|${facebook}|${youtubeRed})`);
const VIDEO_URL = STRING.matches(videoUrlRegExp, 'Please enter correct video url');

// eslint-disable-next-line max-len
export const phoneRegExp = /\+?([\d|(][h|(\d{3})|.|\-|\d]{4,}\d)/;
const PHONE = STRING.matches(phoneRegExp, 'Phone number is not valid').max(25);

// NOTE pretty unique case of validation ᕦ(ツ)ᕤ
const PRIVACY_POLICY = yup.bool().strict()
  .oneOf([true], 'To continue you should accept Terms and acknowledge our Privacy Policy')
  .required('To continue you should accept Terms and acknowledge our Privacy Policy');

const TITLE = STRING
  .min(3, 'Should be at least 3 characters in a length')
  .max(256, 'Should be at less than 256 characters in a length');

const DESCRIPTION = yup.string('Should be a string')
  .nullable()
  .strict()
  .min(3, 'Should be at least 3 characters in a length')
  .max(1000, 'Should be at less than 1000 characters in a length');

const NAME = STRING
  .min(2, 'Should be at least 2 characters in a length')
  .max(16, 'Should be at less than 16 characters in a length');

const CONFIRM_PASSWORD = STRING.oneOf([yup.ref('password'), null], 'Should match with "password" field');

const PASSWORD = STRING
  .min(8, 'Password should be at least 8 characters in a length')
  .matches(/[0-9]/, 'Password should contain at least one numeric character')
  .matches(/[!@#$%^&*)(+=._-]/, 'Password should contain at least one special character e.g.(!@#$%^&*)');
  // .matches(/[a-z]/, 'Password should contain at least one lowercase character')
  // .matches(/[A-Z]/, 'Password should contain at least one uppercase character');

export const VALID = {
  URL,
  NAME,
  DATE,
  EMAIL,
  TITLE,
  PHONE,
  STRING,
  ENTITY,
  NUMBER,
  POSITIVE,
  PASSWORD,
  VIDEO_URL,
  ENTITY_LIST,
  DESCRIPTION,
  PRIVACY_POLICY,
  CONFIRM_PASSWORD,
};
