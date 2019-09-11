import { createSelector } from 'reselect';

import { RootState } from '../index';
import { State } from './index';

export const getState = (state: RootState) => state.productsRequest;


export const getGetProductsRequestState = createSelector(
  getState,
  (state: State) => state.getProducts,
);

export const getIsProductsLoading = createSelector(
  getGetProductsRequestState,
  (state) => state.loading,
);