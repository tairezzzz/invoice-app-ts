import { combineReducers } from 'redux';

import { ActionType, StateType } from 'typesafe-actions';


import {
  Actions as getProducts,
  ActionTypes as getProductsActionTypes,
  epic as getProductsEpic,
  reducer as getProductsReducer,
} from './nested-states/get-products';


export const Actions = {
  getProducts,
};

export const ActionTypes = {
  getProductsActionTypes,
};

export const reducer = combineReducers({
  getProducts: getProductsReducer,
});

export type ActionTypeUnion = ActionType<typeof reducer>;

export const epics = [
  getProductsEpic,
];

export type State = StateType<typeof reducer>;