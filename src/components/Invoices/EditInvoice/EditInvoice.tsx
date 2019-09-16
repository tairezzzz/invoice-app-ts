import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, useSelector } from 'react-redux';
import { Actions as InvoicesActions } from '../../../store/invoices/actions';
import {
  getEntities as getInvoicesEntities,
  getInvoiceItemsArray,
  getItemsIdsArray
} from '../../../store/invoices/selectors';
import {
  getIsGetInvoiceLoading,
  getIsGetInvoiceItemsLoading
} from "../../../store/invoices-requests/selectors";
import { RootState } from '../../../store/index';

import Spinner from '../../../shared/components/Spinner/Spinner';

import InvoiceForm from '../Forms/InvoiceForm';
import { RouteComponentProps } from 'react-router';
import {Invoice, InvoiceItem} from '../../../shared/interfaces/invoice';


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getInvoice: (id: string) => dispatch(InvoicesActions.getInvoice(id)),
  getInvoiceItems: (id: string) => dispatch(InvoicesActions.getInvoiceItems(id)),
  updateInvoice: (payload: Invoice) => dispatch(InvoicesActions.updateInvoice(payload)),
  deleteInvoiceItem: (payload: any) => dispatch(InvoicesActions.deleteInvoiceItem(payload))
});

type Props = ReturnType<typeof mapDispatchToProps> & RouteComponentProps;


const EditInvoice: React.FC<Props> = ({
                                        getInvoice,
                                        getInvoiceItems,
                                        updateInvoice,
                                        deleteInvoiceItem,
                                        match: {params},
                                        history,
                                        ...props}) => {


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
  const invoiceItemsIds = useSelector((state: RootState) => getItemsIdsArray(state))

  const onSubmit = (payload: any) => {

    const payloadIds = payload.items.map((it: InvoiceItem) => it._id).filter((id: string) => !!id)

    const deleteIds = invoiceItemsIds.filter((id: string) => {
      return !payloadIds.includes(id);
    });

    deleteIds.map(id => {
      const deletePayload = {
        inv_id: payload._id,
        id
      }
      return deleteInvoiceItem(deletePayload)
    })


    updateInvoice(payload)
    history.push("/invoices")
  }

  const invoice = invoices[id]

  const discount = (invoice && invoice.discount) || 0

  const customer_id = invoice && invoice.customer_id


  if(isInvoiceLoading || isInvoiceItemsLoading || invoiceItems.length === 0) {
    return <Spinner />
  }

  const items = [...invoiceItems, {product_id: '', quantity: 1}]

  const initialValues = {discount, customer_id, items}


  return (
    <InvoiceForm
      initialValues={initialValues}
      buttonText={"Save changes"}
      _id={id}
      isEdit
      onSubmit={onSubmit}
    />
  )
}

export default connect(null, mapDispatchToProps)(EditInvoice);