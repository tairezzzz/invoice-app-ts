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


export const Actions = {
  getInvoices,
  deleteInvoice,
};

export const ActionTypes = {
  getInvoicesActionTypes,
  deleteInvoiceActionTypes,
};

export const reducer = combineReducers({
  getInvoices: getInvoicesReducer,
  deleteInvoice: deleteInvoiceReducer,
});

export type ActionTypeUnion = ActionType<typeof reducer>;

export const epics = [
  getInvoicesEpic,
  deleteInvoiceEpic,
];

export type State = StateType<typeof reducer>;