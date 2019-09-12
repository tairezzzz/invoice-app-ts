import { Epic, ofType } from 'redux-observable';
import {  map } from 'rxjs/operators';

import { Actions as InvoicesRequestActions, ActionTypes as InvoicesRequestsActionTypes } from '../invoices-requests';
import { transferActionEpicFactory } from '../utils/transfer-action';
import { Actions, ActionTypes } from './actions';




export const getInvoicesRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_INVOICES),
    map(() =>
      InvoicesRequestActions.getInvoices.action(),
    ),
  );

export const getInvoicesRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoicesActionTypes.ACTION_SUCCEEDED,
  Actions.getInvoicesSucceeded,
);

export const getInvoicesRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoicesActionTypes.ACTION_FAILED,
  Actions.getInvoicesFailed,
);


export const deleteInvoiceRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.DELETE_INVOICE),
    map(
      (action) => {
        return InvoicesRequestActions.deleteInvoice.action(action.payload);
      },
    ),
  );

export const deleteInvoiceRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.deleteInvoiceActionTypes.ACTION_SUCCEEDED,
  Actions.deleteInvoiceSucceeded,
);

export const deleteInvoiceRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.deleteInvoiceActionTypes.ACTION_FAILED,
  Actions.deleteInvoiceFailed,
);


export const continueOnDeleteInvoiceSuccess: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.DELETE_INVOICE_SUCCEEDED),
    map(
      () => {
        return InvoicesRequestActions.getInvoices.action();
      }
    )
  );


export const epics = [
  getInvoicesRequest,
  getInvoicesRequestSuccess,
  getInvoicesRequestFail,

  deleteInvoiceRequest,
  deleteInvoiceRequestSuccess,
  deleteInvoiceRequestFail,
  continueOnDeleteInvoiceSuccess,
];