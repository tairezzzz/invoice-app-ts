import { action, ActionType } from 'typesafe-actions';

import { Customer } from '../../shared/interfaces/customer';


export enum ActionTypes {
  GET_CUSTOMERS = 'GET_CUSTOMERS',
  GET_CUSTOMERS_SUCCEEDED = 'GET_CUSTOMERS_SUCCEEDED',
  GET_CUSTOMERS_FAIL = 'GET_CUSTOMERS_FAIL'
}

export const Actions = {
  getCustomers: () => action(ActionTypes.GET_CUSTOMERS),
  getCustomersSucceeded: (payload: Customer[]) => action(ActionTypes.GET_CUSTOMERS_SUCCEEDED, payload),
  getCustomersFailed: (payload?: any) => action(ActionTypes.GET_CUSTOMERS_FAIL, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;