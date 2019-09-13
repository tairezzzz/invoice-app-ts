import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, useSelector } from 'react-redux';
import { Actions as InvoicesActions } from '../../../store/invoices/actions';
import { getEntities as getInvoicesEntities, getInvoiceItemsArray } from '../../../store/invoices/selectors';
import {
  getIsGetInvoiceLoading,
  getIsGetInvoiceItemsLoading
} from "../../../store/invoices-requests/selectors";
import { RootState } from '../../../store/index';

import Spinner from '../../../shared/components/Spinner/Spinner';

import InvoiceForm from '../Forms/InvoiceForm';
import { RouteComponentProps } from 'react-router';
import { Invoice } from '../../../shared/interfaces/invoice';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getInvoice: (id: string) => dispatch(InvoicesActions.getInvoice(id)),
  getInvoiceItems: (id: string) => dispatch(InvoicesActions.getInvoiceItems(id)),
  updateInvoice: (payload: Invoice) => dispatch(InvoicesActions.updateInvoice(payload)),

});

type Props = ReturnType<typeof mapDispatchToProps>   & RouteComponentProps;


const EditInvoice: React.FC<Props> = ({getInvoice, getInvoiceItems, updateInvoice, match: {params}, ...props}) => {


  const id = (params as any)['id']

  useEffect(() => {
    getInvoice(id);
  }, [getInvoice, id]);

  useEffect(() => {
    getInvoiceItems(id);
  }, [getInvoiceItems, id]);

  const onSubmit = (payload: Invoice) => {
    updateInvoice(payload)
  }



  const isInvoiceLoading = useSelector((state: RootState) => getIsGetInvoiceLoading(state))
  const isInvoiceItemsLoading = useSelector((state: RootState) => getIsGetInvoiceItemsLoading(state))

  const invoices = useSelector((state: RootState) => getInvoicesEntities(state))
  const invoiceItems = useSelector((state: RootState) => getInvoiceItemsArray(state))


  const invoice = invoices[id]

  const discount = (invoice && invoice.discount) || 0

  const customer_id = invoice && invoice.customer_id


  if(isInvoiceLoading || isInvoiceItemsLoading || !discount || !customer_id || invoiceItems.length === 0) {
    return <Spinner />
  }

  const items = [...invoiceItems, {product_id: '', quantity: 1}]

  const initialValues = {discount, customer_id, items}


  return (
    <InvoiceForm
      initialValues={initialValues}
      buttonText={"Save changes"}
      _id={id}
      onSubmit={onSubmit}

    />
  )
}

export default connect(null, mapDispatchToProps)(EditInvoice);