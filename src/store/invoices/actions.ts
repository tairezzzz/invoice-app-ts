import { action, ActionType } from 'typesafe-actions';

import { Invoice } from '../../shared/interfaces/invoice';


export enum ActionTypes {
  GET_INVOICES = 'GET_INVOICES',
  GET_INVOICES_SUCCEEDED = 'GET_INVOICES_SUCCEEDED',
  GET_INVOICES_FAIL = 'GET_INVOICES_FAIL',

  DELETE_INVOICE = 'DELETE_INVOICE',
  DELETE_INVOICE_SUCCEEDED = 'DELETE_INVOICE_SUCCEEDED',
  DELETE_INVOICE_FAIL = 'DELETE_INVOICE_FAIL',

  POST_INVOICE = 'POST_INVOICE',
  POST_INVOICE_SUCCEEDED = 'POST_INVOICE_SUCCEEDED',
  POST_INVOICE_FAIL = 'POST_INVOICE_FAIL',
}

export const Actions = {
  getInvoices: () => action(ActionTypes.GET_INVOICES),
  getInvoicesSucceeded: (payload: Invoice[]) => action(ActionTypes.GET_INVOICES_SUCCEEDED, payload),
  getInvoicesFailed: (payload?: any) => action(ActionTypes.GET_INVOICES_FAIL, payload),

  deleteInvoice: (id: string) => action(ActionTypes.DELETE_INVOICE, id),
  deleteInvoiceSucceeded: (payload: Invoice[]) => action(ActionTypes.DELETE_INVOICE_SUCCEEDED, payload),
  deleteInvoiceFailed: (payload?: any) => action(ActionTypes.DELETE_INVOICE_FAIL, payload),

  postInvoice: (payload: object) => action(ActionTypes.POST_INVOICE, payload),
  postInvoiceSucceeded: (payload: Invoice[]) => action(ActionTypes.POST_INVOICE_SUCCEEDED, payload),
  postInvoiceFailed: (payload?: any) => action(ActionTypes.POST_INVOICE_FAIL, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;