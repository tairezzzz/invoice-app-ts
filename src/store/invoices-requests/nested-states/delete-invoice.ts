import { Epic } from 'redux-observable';
import { Action } from 'typesafe-actions';

import { Observable } from 'rxjs';

import { asyncActionHandlerFactory } from '../../utils/async-action-helper';

import { requestsService } from '../service';
import {AjaxResponse} from 'rxjs/ajax';

const { effect, reducer, ActionTypes, Actions } = asyncActionHandlerFactory<string, AjaxResponse, Error>(
  'DELETE_INVOICE_REQUEST',
);

const epic: Epic = (actions$: Observable<Action>) => effect(actions$, (id) => requestsService.deleteInvoice(id));

export { epic, reducer, Actions, ActionTypes };