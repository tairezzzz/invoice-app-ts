import { Epic, ofType } from 'redux-observable';
import {  map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

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



export const postInvoiceRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.POST_INVOICE),
    map(
      (action) => {
        return InvoicesRequestActions.postInvoice.action(action.payload, action.payload.items);
      },
    ),
  );

export const postInvoiceRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.postInvoiceActionTypes.ACTION_SUCCEEDED,
  Actions.postInvoiceSucceeded,
);

export const postInvoiceRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.postInvoiceActionTypes.ACTION_FAILED,
  Actions.postInvoiceFailed,
);


export const postInvoiceItemsRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.POST_INVOICE_SUCCEEDED),
    mergeMap(
      (action) => {
        const { payload, meta } = action.payload;

        const invoice_id = payload.response._id;
        const items = meta;

        return from(items)
          .pipe(
            map(  item => {
              return InvoicesRequestActions.postInvoiceItems.action({...item, invoice_id})
            })
          );
      }
    )
  );

export const postInvoiceItemsRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.postInvoiceItemsActionTypes.ACTION_SUCCEEDED,
  Actions.postInvoiceItemsFailed,
);

export const postInvoiceItemsRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.postInvoiceItemsActionTypes.ACTION_FAILED,
  Actions.postInvoiceItemsFailed,
);


export const continueOnPostInvoiceItemsSuccess: Epic  = (action$) =>
  action$.pipe(
    ofType(ActionTypes.POST_INVOICE_ITEMS_SUCCEEDED),
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

  postInvoiceRequest,
  postInvoiceRequestSuccess,
  postInvoiceRequestFail,

  postInvoiceItemsRequest,
  postInvoiceItemsRequestSuccess,
  postInvoiceItemsRequestFail,
  continueOnPostInvoiceItemsSuccess,
];