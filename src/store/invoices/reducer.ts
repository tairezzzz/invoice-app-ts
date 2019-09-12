import { createEntities } from '../utils/entities';

import { ActionTypes, ActionTypeUnion } from './actions';
import { State } from './state';

const initialState: State = {
  entities: {},
  ids: [],
  currentInvoiceId: null,
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

    default:
      return state;
  }
}