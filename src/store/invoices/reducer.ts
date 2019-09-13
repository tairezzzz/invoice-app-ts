import {createEntities} from '../utils/entities';

import {ActionTypes, ActionTypeUnion} from './actions';
import {State} from './state';


const initialState: State = {
  entities: {},
  ids: [],
  currentInvoiceId: null,
  items: {},
  itemsIds: [],
};

export function reducer(state = initialState, action: ActionTypeUnion): State {
  switch (action.type) {
    case ActionTypes.GET_INVOICES_SUCCEEDED: {
      const invoices = action.payload;

      const previousEntities = action.type === ActionTypes.GET_INVOICES_SUCCEEDED ? {} : state.entities;
      const previousIds = action.type === ActionTypes.GET_INVOICES_SUCCEEDED ? [] : state.ids;

      const [entities, newIds] = createEntities(invoices, previousEntities);

      const ids = [...previousIds, ...newIds];

      return {
        ...state,
        entities,
        ids,
      };
    }

    case ActionTypes.GET_INVOICE_SUCCEEDED:
    case ActionTypes.UPDATE_INVOICE_SUCCEEDED: {
      const invoice = action.payload

      const newEntities = {
        ...state.entities,
        [invoice._id]: invoice,
      };

      return {
        ...state,
        entities: newEntities,
      };
    }

    case ActionTypes.GET_INVOICE_ITEMS_SUCCEEDED:
    case ActionTypes.UPDATE_INVOICE_ITEMS_SUCCEEDED: {
      const invoiceItems = action.payload;

      const previousEntities = action.type === ActionTypes.GET_INVOICE_ITEMS_SUCCEEDED ? {} : state.items;
      const previousIds = action.type === ActionTypes.GET_INVOICE_ITEMS_SUCCEEDED ? [] : state.itemsIds;

      const [items, newIds] = createEntities(invoiceItems, previousEntities);

      const itemsIds = [...previousIds, ...newIds];

      return {
        ...state,
        items,
        itemsIds,
      };
    }

    default:
      return state;
  }
}