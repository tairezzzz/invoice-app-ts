import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from 'redux-devtools-extension';

import { ActionType, StateType } from 'typesafe-actions';

import { ActionTypeUnion as CustomersActionTypeUnion } from './customers/actions';
import { epics as customersEpics } from './customers/epics';
import { reducer as customersReducer } from './customers/reducer';

import {
  ActionTypeUnion as CustomersRequestActionTypeUnion,
  epics as customersRequestEpics,
  reducer as customersRequestReducer,
} from './customers-requests';



export const rootReducer = combineReducers({
  customers: customersReducer,
  customersRequest: customersRequestReducer,
});

export type RootState = StateType<typeof rootReducer>;

export type RootActions = ActionType<
  | CustomersActionTypeUnion
  | CustomersRequestActionTypeUnion
  >;

const rootEpic = combineEpics(
  ...customersEpics,
  ...customersRequestEpics,
);

const epicMiddleware = createEpicMiddleware();

const middleware = [epicMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

epicMiddleware.run(rootEpic);

export default store;