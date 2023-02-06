
// outsource dependencies
import { call } from 'redux-saga/effects';

// local dependencies
import { config } from '../constants';

/**
 * helper to simplify handling exception
 * @example
    yield call(silence, nonSafeAction, some, data);
    // or
    yield takeEvery(ACTION, silence, realActionHandlerExe);
 */
export function * silence (...args) {
  try { return yield call(...args); } catch (error) {
    const payload = args[1];
    const type = payload && payload.type;
    // NOTE specific results for handling error
    config('DEBUG') && console.info(`%c SILENCE ${error.message} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
      , '\n payload:', payload
      , '\n type:', type
      , '\n args:', args
      , '\n error:', error
    );
    return void(0);
  }
}
