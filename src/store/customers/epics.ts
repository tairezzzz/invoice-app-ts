import { Epic, ofType } from 'redux-observable';
import {  map } from 'rxjs/operators';

import { Actions as CustomersRequestActions, ActionTypes as CustomersRequestsActionTypes } from '../customers-requests';
import { transferActionEpicFactory } from '../utils/transfer-action';
import { Actions, ActionTypes } from './actions';




export const getCustomersRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_CUSTOMERS),
    map(() =>
      CustomersRequestActions.getCustomers.action(),
    ),
  );

export const getCustomersRequestSuccess: Epic = transferActionEpicFactory(
  CustomersRequestsActionTypes.getCustomersActionTypes.ACTION_SUCCEEDED,
  Actions.getCustomersSucceeded,
);

export const getCustomersRequestFail: Epic = transferActionEpicFactory(
  CustomersRequestsActionTypes.getCustomersActionTypes.ACTION_FAILED,
  Actions.getCustomersFailed,
);


export const epics = [
  getCustomersRequest,
  getCustomersRequestSuccess,
  getCustomersRequestFail
];
