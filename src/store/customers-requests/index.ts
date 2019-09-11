import { combineReducers } from 'redux';

import { ActionType, StateType } from 'typesafe-actions';


import {
  Actions as getCustomers,
  ActionTypes as getCustomersActionTypes,
  epic as getCustomersEpic,
  reducer as getCustomersReducer,
} from './nested-states/get-customers';


export const Actions = {
  getCustomers,
};

export const ActionTypes = {
  getCustomersActionTypes,
};

export const reducer = combineReducers({
  getCustomers: getCustomersReducer,
});

export type ActionTypeUnion = ActionType<typeof reducer>;

export const epics = [
  getCustomersEpic,
];

export type State = StateType<typeof reducer>;
