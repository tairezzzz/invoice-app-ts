import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, useSelector } from 'react-redux';
import { Actions as InvoicesActions } from '../../../store/invoices/actions';
import {
  getEntities as getInvoicesEntities,
  getInvoiceItemsArray
} from '../../../store/invoices/selectors';
import {
  getIsGetInvoiceLoading,
  getIsGetInvoiceItemsLoading
} from "../../../store/invoices-requests/selectors";
import { RootState } from '../../../store/index';

import Spinner from '../../../shared/components/Spinner/Spinner';

import InvoiceForm from '../Forms/InvoiceForm';
import { RouteComponentProps } from 'react-router';


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getInvoice: (id: string) => dispatch(InvoicesActions.getInvoice(id)),
  getInvoiceItems: (id: string) => dispatch(InvoicesActions.getInvoiceItems(id)),
});

type Props = ReturnType<typeof mapDispatchToProps> & RouteComponentProps;


const ViewInvoice: React.FC<Props> = ({getInvoice, getInvoiceItems, match: {params}}) => {

  const id = (params as any)['id']

  useEffect(() => {
    getInvoice(id);
  }, [getInvoice, id]);

  useEffect(() => {
    getInvoiceItems(id);
  }, [getInvoiceItems, id]);



  const isInvoiceLoading = useSelector((state: RootState) => getIsGetInvoiceLoading(state))
  const isInvoiceItemsLoading = useSelector((state: RootState) => getIsGetInvoiceItemsLoading(state))

  const invoices = useSelector((state: RootState) => getInvoicesEntities(state))
  const invoiceItems = useSelector((state: RootState) => getInvoiceItemsArray(state))


  const invoice = invoices[id]

  const discount = (invoice && invoice.discount) || 0

  const customer_id = invoice && invoice.customer_id



  if(isInvoiceLoading || isInvoiceItemsLoading || invoiceItems.length === 0) {
    return <Spinner />
  }

  const items = [...invoiceItems]

  const initialValues = {discount, customer_id, items}


  return (
    <InvoiceForm
      initialValues={initialValues}
      isView
      _id={id}
    />
  )
}

export default connect(null, mapDispatchToProps)(ViewInvoice);