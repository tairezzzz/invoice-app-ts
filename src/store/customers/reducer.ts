import { createEntities } from '../utils/entities';

import { ActionTypes, ActionTypeUnion } from './actions';
import { State } from './state';

const initialState: State = {
  entities: {},
  ids: [],
  currentCustomerId: null,
};

export function reducer(state = initialState, action: ActionTypeUnion): State {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMERS_SUCCEEDED: {
      const customers = action.payload;

      const previousEntities = action.type === ActionTypes.GET_CUSTOMERS_SUCCEEDED ? {} : state.entities;
      const previousIds = action.type === ActionTypes.GET_CUSTOMERS_SUCCEEDED ? [] : state.ids;

      const [entities, newIds] = createEntities(customers, previousEntities);

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