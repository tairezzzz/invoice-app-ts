import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '../../store/customers/actions';
import { RootState } from '../../store';
import { getCustomersArray } from '../../store/customers/selectors';
import { getIsCustomersLoading } from '../../store/customers-requests/selectors';

import { Table, TableBody, TableHead, TableRow, Paper, Container } from '@material-ui/core';
import { styles } from '../../shared/components/styles/styles';
import StyledTableCell from '../../shared/components/Table/StyledTableCell';
import StyledTableRow from '../../shared/components/Table/StyledTableRow';
import Spinner from '../../shared/components/Spinner/Spinner';




const Customers: React.FC = ({ ...props}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getCustomers())
  }, [dispatch]);

  const customers = useSelector((state: RootState) => getCustomersArray(state))
  const isCustomersLoading = useSelector((state: RootState) => getIsCustomersLoading(state))

  const customersRows = customers.map(customer => (
    <StyledTableRow key={customer._id}>
      <StyledTableCell component="th" scope="row">{customer.name}</StyledTableCell>
      <StyledTableCell>{customer.address}</StyledTableCell>
      <StyledTableCell>{customer.phone}</StyledTableCell>
    </StyledTableRow>
  ))

  if(isCustomersLoading) {
    return <Spinner />
  }

  return (
    <Container>
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Customer Address</StyledTableCell>
              <StyledTableCell>Customer Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {customersRows}

          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Customers;