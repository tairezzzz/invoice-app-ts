import React from 'react';
import InvoiceForm from '../Forms/InvoiceForm';
import { Dispatch } from 'redux';
import { Actions as InvoicesActions } from '../../../store/invoices/actions';
import { InvoiceInput} from '../../../shared/interfaces/invoice';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  postInvoice: (payload: InvoiceInput) => dispatch(InvoicesActions.postInvoice(payload)),

});

type Props = ReturnType<typeof mapDispatchToProps>;

const CreateInvoice: React.FC<Props> = ({postInvoice}) => {

  const onSubmit = (payload: InvoiceInput) => {
    postInvoice(payload)
  }

  return (
    <InvoiceForm
      buttonText={"save invoice"}
      onSubmit={onSubmit}

    />
  )
}

export default connect(null, mapDispatchToProps)(CreateInvoice)

