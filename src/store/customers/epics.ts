import { Epic, ofType } from 'redux-observable';
// import { PayloadAction } from 'typesafe-actions';
import {  map } from 'rxjs/operators';

import { Actions as CustomersRequestActions, ActionTypes as CustomersRequestsActionTypes } from '../customers-requests';

import { Actions, ActionTypes } from './actions';




export const getCustomersRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_CUSTOMERS),
    map(() =>
      CustomersRequestActions.getCustomers.action(),
    ),
  );

// export const getOffersRequestSuccess: Epic = transferActionEpicFactory(
//   OffersRequestsActionTypes.getOffersActionTypes.ACTION_SUCCEEDED,
//   Actions.getOffersSucceeded,
//   ActionTypes.GET_OFFERS,
// );
//
// export const getOffersRequestFail: Epic = transferActionEpicFactory(
//   OffersRequestsActionTypes.getOffersActionTypes.ACTION_FAILED,
//   Actions.getOffersFailed,
//   ActionTypes.GET_OFFERS,
// );



export const getCustomersRequestSuccess: Epic = (action$) =>
  action$.pipe(
    ofType(CustomersRequestsActionTypes.getCustomersActionTypes.ACTION_SUCCEEDED),
    map(() => Actions.getCustomersSucceeded)
    // map((action) => getCustomersSucceeded(action.payload))
  )

export const getCustomersRequestFail: Epic = (action$) =>
  action$.pipe(
    ofType(CustomersRequestsActionTypes.getCustomersActionTypes.ACTION_FAILED),
    map(() => Actions.getCustomersFailed)
// map((action) => getCustomersFail(action.payload)),
  )

export const epics = [
  getCustomersRequest,
  getCustomersRequestSuccess,
  getCustomersRequestFail
];
