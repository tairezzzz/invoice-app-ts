import { Epic } from 'redux-observable';
import { Action } from 'typesafe-actions';

import { Observable } from 'rxjs';

import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';
import { AjaxResponse } from 'rxjs/ajax';
import { InvoiceItem } from '../../../shared/interfaces/invoice';

const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory<InvoiceItem, AjaxResponse, Error>(
  'DELETE_INVOICE_ITEM_REQUEST',
);

const epic: Epic = (actions$: Observable<Action>) => effect(actions$, (id) => requestsService.deleteInvoiceItem(id));

export { epic, reducer, Actions, ActionTypes };