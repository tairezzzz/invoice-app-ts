import { createSelector } from 'reselect';

import { RootState } from '../index';
import { State } from './index';

export const getState = (state: RootState) => state.invoicesRequests;


export const getGetInvoicesRequestState = createSelector(
  getState,
  (state: State) => state.getInvoices,
);

export const getIsInvoicesLoading = createSelector(
  getGetInvoicesRequestState,
  (state) => state.loading,
);

export const getPostInvoiceRequestState = createSelector(
  getState,
  (state: State) => state.postInvoice,
);

export const getIsPostInvoiceLoading = createSelector(
  getPostInvoiceRequestState,
  (state) => state.loading,
);


export const getGetInvoiceRequestState = createSelector(
  getState,
  (state: State) => state.getInvoice,
);

export const getIsGetInvoiceLoading = createSelector(
  getGetInvoiceRequestState,
  (state) => state.loading,
);


export const getGetInvoiceItemsRequestState = createSelector(
  getState,
  (state: State) => state.getInvoiceItems,
);

export const getIsGetInvoiceItemsLoading = createSelector(
  getGetInvoiceItemsRequestState,
  (state) => state.loading,
);

export const getUpdateInvoiceRequestState = createSelector(
  getState,
  (state: State) => state.updateInvoice,
);

export const getIsUpdateInvoiceLoading = createSelector(
  getUpdateInvoiceRequestState,
  (state) => state.loading,
);