import React, { useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from '../../store/products/actions';
import { RootState } from '../../store';
import { getProductsArray } from '../../store/products/selectors';
import { getIsProductsLoading } from '../../store/products-requests/selectors';

import { Table, TableBody, TableHead, TableRow, Paper, Container } from '@material-ui/core';
import { styles } from '../../shared/components/styles/styles';
import StyledTableCell from '../../shared/components/Table/StyledTableCell';
import StyledTableRow from '../../shared/components/Table/StyledTableRow';
import Spinner from '../../shared/components/Spinner/Spinner';



const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProducts: () => dispatch(Actions.getProducts()),
});


type Props = ReturnType<typeof mapDispatchToProps>;

const Products: React.FC<Props> = ({getProducts, ...props}) => {

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const products = useSelector((state: RootState) => getProductsArray(state))
  const isProductsLoading = useSelector((state: RootState) => getIsProductsLoading(state))

  const productsRows = products.map(product => (
    <StyledTableRow key={product._id}>
      <StyledTableCell component="th" scope="row">{product.name}</StyledTableCell>
      <StyledTableCell>{product.price}</StyledTableCell>
    </StyledTableRow>
  ))

  if(isProductsLoading) {
    return <Spinner />
  }

  return (
    <Container>
      <Paper style={styles.root}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {productsRows}

          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}


export default connect(null, mapDispatchToProps)(Products);