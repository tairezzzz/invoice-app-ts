import React, { useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from '../../store/customers/actions';
import { RootState } from '../../store';
import { getCustomersArray } from '../../store/customers/selectors';
import { getIsCustomersLoading } from '../../store/customers-requests/selectors';

import { Table, TableBody, TableHead, TableRow, Paper, Container } from '@material-ui/core';
import { styles } from '../../shared/components/styles/styles';
import StyledTableCell from '../../shared/components/Table/StyledTableCell';
import StyledTableRow from '../../shared/components/Table/StyledTableRow';
import Spinner from '../../shared/components/Spinner/Spinner';



const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCustomers: () => dispatch(Actions.getCustomers()),
});


type Props = ReturnType<typeof mapDispatchToProps>;

const Customers: React.FC<Props> = ({getCustomers, ...props}) => {

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

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


export default connect(null, mapDispatchToProps)(Customers);