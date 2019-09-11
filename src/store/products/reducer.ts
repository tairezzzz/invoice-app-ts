import { createEntities } from '../utils/entities';

import { ActionTypes, ActionTypeUnion } from './actions';
import { State } from './state';

const initialState: State = {
  entities: {},
  ids: [],
  currentProductId: null,
};

export function reducer(state = initialState, action: ActionTypeUnion): State {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_SUCCEEDED: {
      const products = action.payload;

      const previousEntities = action.type === ActionTypes.GET_PRODUCTS_SUCCEEDED ? {} : state.entities;
      const previousIds = action.type === ActionTypes.GET_PRODUCTS_SUCCEEDED ? [] : state.ids;

      const [entities, newIds] = createEntities(products, previousEntities);

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