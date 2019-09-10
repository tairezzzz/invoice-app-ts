import { createSelector } from 'reselect';

import { RootState } from '../index';

import { State } from './state';

export const getCustomersState = (state: RootState) => state.customers;

export const getEntities = createSelector(
  getCustomersState,
  (state: State) => state.entities,
);


export const getCustomersArray = createSelector(
  getCustomersState,
  getEntities,
  (state: State, entities) => state.ids.map((id) => entities[id]),
);