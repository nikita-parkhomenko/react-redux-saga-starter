
export const NEW_ID = 'new';

export const APP_TITLE = 'Djema';

export const IMG_DIR = {
  DEFAULT: 'DEFAULT',
  USER: 'USER',
};

export const ACCOUNT_TYPE = {
  STUDENT: 'STUDENT',
  MENTOR: 'MENTOR',
  PARENT: 'PARENT',
};

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
};

export const USER_STATE = {
  INACTIVE: 'INACTIVE',               // user was deleted from the system
  CREATED: 'CREATED',                 // user created but does not finish sign up wizard
  PENDING: 'PENDING',                 // user was created pass sign up but does not confirm email
  ACTIVE: 'ACTIVE',                   // user was created pass sign up and confirm email
};

export const DIR = {
  DOCUMENT: 'DOCUMENT',     // wtf ???
  DEFAULT: 'DEFAULT',       // wtf ???
  USER: 'USER',             // user pics
};

// NOTE: common rules for pics aspect ratio
export const ASPECT = {
  USER_PROFILE: 1,
};

export const CURRENCY = {
  USD: 'USD',               // US Dollar
  EUR: 'EUR',               // Euro
};

export const ACCEPTED_FILE_TYPES = {
  IMAGES: ['image/jpe', 'image/jpg', 'image/jpeg', 'image/png'],
  VIDEOS: ['video/*'],
};

export const CART_TYPE = {
  STREAM: 'STREAM',
  DONATION: 'DONATION',
};

export const NOTIFICATION_TYPE = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  UNREAD_NOTIFICATION_COUNTER: 'UNREAD_NOTIFICATION_COUNTER',
};
