import { createSelector } from 'reselect';

import { RootState } from '../index';

import { State } from './state';

export const getInvoicesState = (state: RootState) => state.invoices;

export const getEntities = createSelector(
  getInvoicesState,
  (state: State) => state.entities,
);


export const getInvoicesArray = createSelector(
  getInvoicesState,
  getEntities,
  (state: State, entities) => state.ids.map((id) => entities[id]),
);