import { Epic, ofType } from 'redux-observable';
import {  map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { Actions as InvoicesRequestActions, ActionTypes as InvoicesRequestsActionTypes } from '../invoices-requests';
import { transferActionEpicFactory } from '../utils/transfer-action';
import { Actions, ActionTypes } from './actions';
import {InvoiceItem} from '../../shared/interfaces/invoice';




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

export const postInvoiceRequestSuccess: Epic = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.postInvoiceActionTypes.ACTION_SUCCEEDED),
    map((action) => Actions.postInvoiceSucceeded(action))
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
        console.log(action);
        const { payload } = action;

        const invoice_id = payload.payload._id;
        const items = payload.meta;

        return from(items)
          .pipe(
            map(  item => {
              console.log(item);
              return InvoicesRequestActions.postInvoiceItems.action({...item, invoice_id})
            })
          );
      }
    )
  );

export const postInvoiceItemsRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.postInvoiceItemsActionTypes.ACTION_SUCCEEDED,
  Actions.postInvoiceItemsSucceeded,
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


export const getInvoiceRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_INVOICE),
    map((action) => {
      return InvoicesRequestActions.getInvoice.action(action.payload)},
    ),
  );

export const getInvoiceRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceActionTypes.ACTION_SUCCEEDED,
  Actions.getInvoiceSucceeded,
);

export const getInvoiceRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceActionTypes.ACTION_FAILED,
  Actions.getInvoiceFailed,
);


export const getInvoiceItemsRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_INVOICE_ITEMS),
    map((action) => {
      return InvoicesRequestActions.getInvoiceItems.action(action.payload)},
    ),
  );

export const getInvoiceItemsRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceItemsActionTypes.ACTION_SUCCEEDED,
  Actions.getInvoiceItemsSucceeded,
);

export const getInvoiceItemsRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.getInvoiceItemsActionTypes.ACTION_FAILED,
  Actions.getInvoiceItemsFailed,
);


export const updateInvoiceRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.UPDATE_INVOICE),
    map(
      (action) => {
        return InvoicesRequestActions.updateInvoice.action(action.payload, action.payload.items)
      },
    ),
  );

export const updateInvoiceRequestSuccess: Epic = (action$) =>
  action$.pipe(
    ofType(InvoicesRequestsActionTypes.updateInvoiceActionTypes.ACTION_SUCCEEDED),
    map((action) => Actions.updateInvoiceSucceeded(action))
  );

export const updateInvoiceRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.updateInvoiceActionTypes.ACTION_FAILED,
  Actions.updateInvoiceFailed,
);


export const updateInvoiceItemsRequest: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.UPDATE_INVOICE_SUCCEEDED),
    mergeMap(
      (action) => {

        const { payload, meta } = action.payload;

        const invoice_id = payload.response && payload.response._id;
        const items = meta;

        const itemsForUpdate = items.filter((item: InvoiceItem )=> item._id)

        return from(itemsForUpdate)
          .pipe(
            map(  item => {
              return InvoicesRequestActions.updateInvoiceItems.action({...item, invoice_id})
            })
          );
      }
    )
  );

export const updateInvoiceItemsRequestSuccess: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.updateInvoiceItemsActionTypes.ACTION_SUCCEEDED,
  Actions.updateInvoiceItemsSucceeded,
);

export const updateInvoiceItemsRequestFail: Epic = transferActionEpicFactory(
  InvoicesRequestsActionTypes.updateInvoiceItemsActionTypes.ACTION_FAILED,
  Actions.updateInvoiceItemsFailed,
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

  getInvoiceRequest,
  getInvoiceRequestSuccess,
  getInvoiceRequestFail,

  getInvoiceItemsRequest,
  getInvoiceItemsRequestSuccess,
  getInvoiceItemsRequestFail,

  updateInvoiceRequest,
  updateInvoiceRequestSuccess,
  updateInvoiceRequestFail,

  updateInvoiceItemsRequest,
  updateInvoiceItemsRequestSuccess,
  updateInvoiceItemsRequestFail,
];