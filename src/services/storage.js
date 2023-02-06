
// polyfill from MDN https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
/* istanbul ignore next */
export const cookieStorage = {
  getItem: sKey => (!cookieStorage.hasProperty(sKey) ? null
    : unescape(document.cookie.replace(
      new RegExp(`(?:^|.*;\\s*)${ escape(sKey).replace(/[-.+*]/g, '\\$&') }\\s*=\\s*((?:[^;](?!;))*[^;]?).*`),
      '$1'
    ))),
  setItem: (sKey, sValue) => (!sKey ? null
    : (document.cookie = `${escape(sKey) }=${ escape(sValue) }; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`)) && null,
  removeItem: sKey => (!cookieStorage.hasProperty(sKey) ? null
    : (document.cookie = `${escape(sKey) }=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)) && null,
  hasProperty: sKey => (!sKey ? false
    : (new RegExp(`(?:^|;\\s*)${ escape(sKey).replace(/[-.+*]/g, '\\$&') }\\s*\\=`)).test(document.cookie)),
};

/**
 * helper to simplify usage of stores
 * @example const local = new Storage(window.localStorage);
 */
export class Storage {
  store = null;

  isSupported = true;

  constructor (store) {
    this.store = store;
    try {
      const property = 'null';
      const value = '_test_store_by_storage_service';
      // NOTE check availability of storage
      this.store.setItem(property, value);
      const extracted = this.store.getItem(property);
      this.store.removeItem(property);
      if (extracted !== value) {
        throw new Error('Invalid "storage" behavior');
      }
    } catch (error) {
      this.isSupported = false;
    }
  }

  remove = name => this.isSupported && this.store.removeItem(name);

  set = (name, data) => {
    if (!this.isSupported) { return null; }
    this.remove(name);
    this.store.setItem(name, JSON.stringify(data));
  };

  get = name => {
    if (!this.isSupported) { return null; }
    const data = this.store.getItem(name);
    try {
      // NOTE: data can be simple string
      return JSON.parse(data);
    } catch (e) /* istanbul ignore next */ {
      return data;
    }
  };

  update = (name, data = {}) => {
    if (!this.isSupported) { return null; }
    // NOTE: working fine only with objects
    const prev = this.get(name) || {};
    this.set(name, Object.assign(prev, data));
  };

  /**
   * helper to simplify usage of storage binded to specific path
   * @example const TestStore = (new Storage(window.localStorage)).bindToPath('e');
   * @param {String} name
   * @return {{path: *, set: (function(*=): void), get: (function(): any)}}
   */
  bindToPath = name => ({
    name,
    get: () => this.get(name),
    isSupported: this.isSupported,
    remove: () => this.remove(name),
    set: value => this.set(name, value),
    update: value => this.update(name, value),
  });
}

/**
 * Prepared stores for specific things
 */
const cookie = new Storage(cookieStorage);
const local = new Storage(window.localStorage);
const session = new Storage(window.sessionStorage);
// NOTE primitive checking of support - for example "Incognito Mode"
const storage = local.isSupported ? local : session.isSupported ? session : cookie;

/**
  * Ready to use stores for specific things
  */
export const AccessTokenStorage = storage.bindToPath('ats');
export const RefreshTokenStorage = storage.bindToPath('rts');
