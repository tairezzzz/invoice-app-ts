import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from 'redux-devtools-extension';

import { ActionType, StateType } from 'typesafe-actions';

import { ActionTypeUnion as CustomersActionTypeUnion } from './customers/actions';
import { epics as customersEpics } from './customers/epics';
import { reducer as customersReducer } from './customers/reducer';

import { ActionTypeUnion as ProductsActionTypeUnion } from './products/actions';
import { epics as productsEpics } from './products/epics';
import { reducer as productsReducer } from './products/reducer';

import { ActionTypeUnion as InvoicesActionTypeUnion } from './invoices/actions';
import { epics as invoicesEpics } from './invoices/epics';
import { reducer as invoicesReducer } from './invoices/reducer';

import {
  ActionTypeUnion as CustomersRequestActionTypeUnion,
  epics as customersRequestEpics,
  reducer as customersRequestReducer,
} from './customers-requests';

import {
  ActionTypeUnion as ProductsRequestActionTypeUnion,
  epics as productsRequestEpics,
  reducer as productsRequestReducer,
} from './products-requests';

import {
  ActionTypeUnion as InvoicesRequestActionTypeUnion,
  epics as invoicesRequestEpics,
  reducer as invoicesRequestReducer,
} from './invoices-requests';


export const rootReducer = combineReducers({
  customers: customersReducer,
  customersRequest: customersRequestReducer,
  products: productsReducer,
  productsRequest: productsRequestReducer,
  invoices: invoicesReducer,
  invoicesRequests: invoicesRequestReducer,
});

export type RootState = StateType<typeof rootReducer>;

export type RootActions = ActionType<
  | CustomersActionTypeUnion
  | CustomersRequestActionTypeUnion
  | ProductsActionTypeUnion
  | ProductsRequestActionTypeUnion
  | InvoicesActionTypeUnion
  | InvoicesRequestActionTypeUnion
  >;

const rootEpic = combineEpics(
  ...customersEpics,
  ...customersRequestEpics,
  ...productsEpics,
  ...productsRequestEpics,
  ...invoicesEpics,
  ...invoicesRequestEpics,
);

const epicMiddleware = createEpicMiddleware();

const middleware = [epicMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

epicMiddleware.run(rootEpic);

export default store;