import React, { useEffect } from 'react';
import { Dispatch} from 'redux';
import { connect, useSelector } from 'react-redux';
import { Actions } from '../../../../store/products/actions';
import { getProductsArray } from "../../../../store/products/selectors";
import { MenuItem, FormControl, Select, InputLabel, FormHelperText } from '@material-ui/core';
import { styles } from './styles';
import _ from 'lodash'
import { RootState } from '../../../../store/index';
import { FormikValues } from 'formik';



interface SelectorProps {
  field: {
    name: string
  }
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProducts: () => dispatch(Actions.getProducts()),
});


type Props = ReturnType<typeof mapDispatchToProps> & FormikValues & SelectorProps;


const ProductSelector: React.FC<Props> = ({getProducts, field, form,...props}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const fieldError = _.get(form.errors, field.name)
  const fieldTouched = _.get(form.touched, field.name)

  const products = useSelector((state: RootState)=> getProductsArray(state))
  return (
    <FormControl
      style={styles.formControl}
      error={fieldTouched && !!fieldError}
    >
      <InputLabel htmlFor={field.name}>Select Product</InputLabel>
      <Select
        {...field}
        id={field.name}
        name={field.name}
        margin="dense"
        style={styles.selectEmpty}
        {...props}
      >
        {
          products.map(product => (
            <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{fieldTouched && fieldError}</FormHelperText>
    </FormControl>
  )
}



export default connect(null, mapDispatchToProps)(ProductSelector);