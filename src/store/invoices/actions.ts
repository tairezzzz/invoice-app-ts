import { action, ActionType } from 'typesafe-actions';

import { Invoice, InvoiceItem } from '../../shared/interfaces/invoice';


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

  POST_INVOICE_ITEMS = 'POST_INVOICE_ITEMS',
  POST_INVOICE_ITEMS_SUCCEEDED = 'POST_INVOICE_ITEMS_SUCCEEDED',
  POST_INVOICE_ITEMS_FAIL = 'POST_INVOICE_ITEMS_FAIL',

  GET_INVOICE = 'GET_INVOICE',
  GET_INVOICE_SUCCEEDED = 'GET_INVOICE_SUCCEEDED',
  GET_INVOICE_FAIL = 'GET_INVOICE_FAIL',

  GET_INVOICE_ITEMS = 'GET_INVOICE_ITEMS',
  GET_INVOICE_ITEMS_SUCCEEDED = 'GET_INVOICE_ITEMS_SUCCEEDED',
  GET_INVOICE_ITEMS_FAIL = 'GET_INVOICE_ITEMS_FAIL',

  UPDATE_INVOICE = 'UPDATE_INVOICE',
  UPDATE_INVOICE_SUCCEEDED = 'UPDATE_INVOICE_SUCCEEDED',
  UPDATE_INVOICE_FAIL = 'UPDATE_INVOICE_FAIL',

  UPDATE_INVOICE_ITEMS = 'UPDATE_INVOICE_ITEMS',
  UPDATE_INVOICE_ITEMS_SUCCEEDED = 'UPDATE_INVOICE_ITEMS_SUCCEEDED',
  UPDATE_INVOICE_ITEMS_FAIL = 'UPDATE_INVOICE_ITEMS_FAIL',
}

export const Actions = {
  getInvoices: () => action(ActionTypes.GET_INVOICES),
  getInvoicesSucceeded: (payload: Invoice[]) => action(ActionTypes.GET_INVOICES_SUCCEEDED, payload),
  getInvoicesFailed: (payload?: any) => action(ActionTypes.GET_INVOICES_FAIL, payload),

  deleteInvoice: (id: string) => action(ActionTypes.DELETE_INVOICE, id),
  deleteInvoiceSucceeded: (payload: Invoice[]) => action(ActionTypes.DELETE_INVOICE_SUCCEEDED, payload),
  deleteInvoiceFailed: (payload?: any) => action(ActionTypes.DELETE_INVOICE_FAIL, payload),

  postInvoice: (payload: object) => action(ActionTypes.POST_INVOICE, payload),
  postInvoiceSucceeded: (payload: any) => action(ActionTypes.POST_INVOICE_SUCCEEDED, payload),
  postInvoiceFailed: (payload?: any) => action(ActionTypes.POST_INVOICE_FAIL, payload),

  postInvoiceItems: (payload: InvoiceItem) => action(ActionTypes.POST_INVOICE_ITEMS, payload),
  postInvoiceItemsSucceeded: (payload: InvoiceItem[]) => action(ActionTypes.POST_INVOICE_ITEMS_SUCCEEDED, payload),
  postInvoiceItemsFailed: (payload?: any) => action(ActionTypes.POST_INVOICE_ITEMS_FAIL, payload),

  getInvoice: (id: string) => action(ActionTypes.GET_INVOICE, id),
  getInvoiceSucceeded: (payload: Invoice) => action(ActionTypes.GET_INVOICE_SUCCEEDED, payload),
  getInvoiceFailed: (payload?: any) => action(ActionTypes.GET_INVOICE_FAIL, payload),

  getInvoiceItems: (id: string) => action(ActionTypes.GET_INVOICE_ITEMS, id),
  getInvoiceItemsSucceeded: (payload: InvoiceItem[]) => action(ActionTypes.GET_INVOICE_ITEMS_SUCCEEDED, payload),
  getInvoiceItemsFailed: (payload?: any) => action(ActionTypes.GET_INVOICE_ITEMS_FAIL, payload),

  updateInvoice: (payload: object) => action(ActionTypes.UPDATE_INVOICE, payload),
  updateInvoiceSucceeded: (payload: any) => action(ActionTypes.UPDATE_INVOICE_SUCCEEDED, payload),
  updateInvoiceFailed: (payload?: any) => action(ActionTypes.UPDATE_INVOICE_FAIL, payload),

  updateInvoiceItems: (payload: InvoiceItem) => action(ActionTypes.UPDATE_INVOICE_ITEMS, payload),
  updateInvoiceItemsSucceeded: (payload: InvoiceItem[]) => action(ActionTypes.UPDATE_INVOICE_ITEMS_SUCCEEDED, payload),
  updateInvoiceItemsFailed: (payload?: any) => action(ActionTypes.UPDATE_INVOICE_ITEMS_FAIL, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;