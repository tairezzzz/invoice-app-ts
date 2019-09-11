import { createSelector } from 'reselect';

import { RootState } from '../index';
import { State } from './index';

export const getState = (state: RootState) => state.customersRequest;


export const getGetCustomersRequestState = createSelector(
  getState,
  (state: State) => state.getCustomers,
);

export const getIsCustomersLoading = createSelector(
  getGetCustomersRequestState,
  (state) => state.loading,
);