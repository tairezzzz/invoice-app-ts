import { Epic, ofType } from 'redux-observable';
import {  map } from 'rxjs/operators';

import { Actions as ProductsRequestActions, ActionTypes as ProductsRequestsActionTypes } from '../products-requests';
import { transferActionEpicFactory } from '../utils/transfer-action';
import { Actions, ActionTypes } from './actions';




export const getProductsRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_PRODUCTS),
    map(() =>
      ProductsRequestActions.getProducts.action(),
    ),
  );

export const getProductsRequestSuccess: Epic = transferActionEpicFactory(
  ProductsRequestsActionTypes.getProductsActionTypes.ACTION_SUCCEEDED,
  Actions.getProductsSucceeded,
);

export const getProductsRequestFail: Epic = transferActionEpicFactory(
  ProductsRequestsActionTypes.getProductsActionTypes.ACTION_FAILED,
  Actions.getProductsFailed,
);


export const epics = [
  getProductsRequest,
  getProductsRequestSuccess,
  getProductsRequestFail
];