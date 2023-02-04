
// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { reducer as toastr } from 'react-redux-toastr';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as ctrlReducer, sagas as ctrlSaga, path as ctrlPath } from 'redux-saga-controller';

// local dependencies
import { config } from './index';

// Apply "redux" extension compose for non production environment
const enchantedCompose = !config('DEBUG', false)
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: false,
      actionsDenylist: ['@CSD'],
      name: `${config('NAME')}@${config('SID')}`,
    }) : compose;
// Build the middleware to run our Sagas
const sagaMiddleware = createSagaMiddleware();

// Create store outside of root to be able "dispatch" actions from anywhere!
// https://github.com/reduxjs/redux/issues/4325
// you may see that suck where the contributor try to push people to use RTK even if it doesn't need
export const store = createStore(
  combineReducers({
    [ctrlPath]: ctrlReducer,
    toastr,
  }),
  enchantedCompose(applyMiddleware(sagaMiddleware))
);

// initialize saga
sagaMiddleware.run(ctrlSaga);
