import { createSelector } from 'reselect';

import { RootState } from '../index';

import { State } from './state';

export const getProductsState = (state: RootState) => state.products;

export const getEntities = createSelector(
  getProductsState,
  (state: State) => state.entities,
);


export const getProductsArray = createSelector(
  getProductsState,
  getEntities,
  (state: State, entities) => state.ids.map((id) => entities[id]),
);