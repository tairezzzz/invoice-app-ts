import React, { useEffect } from 'react';

import { Table, TableBody, TableHead, TableRow, Paper, Container } from '@material-ui/core';

import { connect, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Actions as InvoicesActions } from '../../../store/invoices/actions';
import { Actions as CustomersActions } from '../../../store/customers/actions';

import { getInvoicesArray } from '../../../store/invoices/selectors';
import { getEntities as getCustomersSelector } from '../../../store/customers/selectors';
import { getIsCustomersLoading } from "../../../store/customers-requests/selectors";
import { getIsInvoicesLoading } from "../../../store/invoices-requests/selectors";

import { RootState } from '../../../store/index';
import { RouteComponentProps } from 'react-router-dom';

import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';
import StyledTableCell from '../../../shared/components/Table/StyledTableCell';
import { styles } from './styles';
import Spinner from "../../../shared/components/Spinner/Spinner";




const mapDispatchToProps = (dispatch: Dispatch) => ({
  getInvoices: () => dispatch(InvoicesActions.getInvoices()),
  getCustomers: () => dispatch(CustomersActions.getCustomers()),
  deleteInvoice: (id: string) => dispatch(InvoicesActions.deleteInvoice(id)),
});


type Props = ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

const InvoicesList: React.FC<Props> = ({getCustomers, getInvoices, deleteInvoice, location }) => {
  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const onDeletingInvoice = (id: string) => {
    deleteInvoice(id)
  }


  const isInvoicesPage = location.pathname === "/invoices"


  const customers = useSelector((state: RootState) => getCustomersSelector(state))
  const invoices = useSelector((state: RootState) => getInvoicesArray(state))
  const isCustomersLoading = useSelector((state: RootState) => getIsCustomersLoading(state))
  const isInvoicesLoading = useSelector((state: RootState) => getIsInvoicesLoading(state))

  if (isCustomersLoading || isInvoicesLoading ) {
    return <Spinner/>
  }

  const invoicesRows  =  invoices
    ? invoices.map(invoice => (
      <InvoiceListItem
        key={invoice._id}
        inv_id={invoice._id}
        customers={customers}
        {...invoice}
        onDeletingInvoice={onDeletingInvoice}
        isInvoicesPage={isInvoicesPage}/> ))
    : null;


  return (
    <Container>
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoice ID</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Discount (%)</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {invoicesRows}

          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default connect(null, mapDispatchToProps)(InvoicesList);