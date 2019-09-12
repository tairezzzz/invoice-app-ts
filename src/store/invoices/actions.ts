import { action, ActionType } from 'typesafe-actions';

import { Invoice } from '../../shared/interfaces/invoice';


export enum ActionTypes {
  GET_INVOICES = 'GET_INVOICES',
  GET_INVOICES_SUCCEEDED = 'GET_INVOICES_SUCCEEDED',
  GET_INVOICES_FAIL = 'GET_INVOICES_FAIL'
}

export const Actions = {
  getInvoices: () => action(ActionTypes.GET_INVOICES),
  getInvoicesSucceeded: (payload: Invoice[]) => action(ActionTypes.GET_INVOICES_SUCCEEDED, payload),
  getInvoicesFailed: (payload?: any) => action(ActionTypes.GET_INVOICES_FAIL, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;