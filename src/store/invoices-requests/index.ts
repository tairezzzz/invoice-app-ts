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


export const Actions = {
  getInvoices,
  deleteInvoice,
  postInvoice,
};

export const ActionTypes = {
  getInvoicesActionTypes,
  deleteInvoiceActionTypes,
  postInvoiceActionTypes,
};

export const reducer = combineReducers({
  getInvoices: getInvoicesReducer,
  deleteInvoice: deleteInvoiceReducer,
  postInvoice: postInvoiceReducer,
});

export type ActionTypeUnion = ActionType<typeof reducer>;

export const epics = [
  getInvoicesEpic,
  deleteInvoiceEpic,
  postInvoiceEpic,
];

export type State = StateType<typeof reducer>;