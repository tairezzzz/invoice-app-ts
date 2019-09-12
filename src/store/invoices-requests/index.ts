import { combineReducers } from 'redux';

import { ActionType, StateType } from 'typesafe-actions';


import {
  Actions as getInvoices,
  ActionTypes as getInvoicesActionTypes,
  epic as getInvoicesEpic,
  reducer as getInvoicesReducer,
} from './nested-states/get-invoices';

import {
  Actions as deleteInvoice,
  ActionTypes as deleteInvoiceActionTypes,
  epic as deleteInvoiceEpic,
  reducer as deleteInvoiceReducer,
} from './nested-states/delete-invoice';

import {
  Actions as postInvoice,
  ActionTypes as postInvoiceActionTypes,
  epic as postInvoiceEpic,
  reducer as postInvoiceReducer,
} from './nested-states/post-invoice';

import {
  Actions as postInvoiceItems,
  ActionTypes as postInvoiceItemsActionTypes,
  epic as postInvoiceItemsEpic,
  reducer as postInvoiceItemsReducer,
} from './nested-states/post-invoice-items';

export const Actions = {
  getInvoices,
  deleteInvoice,
  postInvoice,
  postInvoiceItems,
};

export const ActionTypes = {
  getInvoicesActionTypes,
  deleteInvoiceActionTypes,
  postInvoiceActionTypes,
  postInvoiceItemsActionTypes,
};

export const reducer = combineReducers({
  getInvoices: getInvoicesReducer,
  deleteInvoice: deleteInvoiceReducer,
  postInvoice: postInvoiceReducer,
  postInvoiceItems: postInvoiceItemsReducer,
});

export type ActionTypeUnion = ActionType<typeof reducer>;

export const epics = [
  getInvoicesEpic,
  deleteInvoiceEpic,
  postInvoiceEpic,
  postInvoiceItemsEpic,
];

export type State = StateType<typeof reducer>;