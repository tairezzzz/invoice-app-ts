import { action, ActionType } from 'typesafe-actions';

import { Product } from '../../shared/interfaces/product';


export enum ActionTypes {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCEEDED = 'GET_PRODUCTS_SUCCEEDED',
  GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL'
}

export const Actions = {
  getProducts: () => action(ActionTypes.GET_PRODUCTS),
  getProductsSucceeded: (payload: Product[]) => action(ActionTypes.GET_PRODUCTS_SUCCEEDED, payload),
  getProductsFailed: (payload?: any) => action(ActionTypes.GET_PRODUCTS_FAIL, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;