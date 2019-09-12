import { combineReducers } from 'redux';

import { ActionType, StateType } from 'typesafe-actions';


import {
  Actions as getInvoices,
  ActionTypes as getInvoicesActionTypes,
  epic as getInvoicesEpic,
  reducer as getInvoicesReducer,
} from './nested-states/get-invoices';


export const Actions = {
  getInvoices,
};

export const ActionTypes = {
  getInvoicesActionTypes,
};

export const reducer = combineReducers({
  getInvoices: getInvoicesReducer,
});

export type ActionTypeUnion = ActionType<typeof reducer>;

export const epics = [
  getInvoicesEpic,
];

export type State = StateType<typeof reducer>;