import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect, useSelector } from 'react-redux';
import { Actions } from '../../../../store/customers/actions';
import { getCustomersArray } from '../../../../store/customers/selectors';
import { MenuItem, FormControl, Select, InputLabel, FormHelperText } from '@material-ui/core';
import { styles } from './styles';
import { RootState } from '../../../../store/index';
import { FormikValues } from 'formik/dist/types';

interface SelectorProps {
  field: {
    name: string
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCustomers: () => dispatch(Actions.getCustomers()),
});


type Props = ReturnType<typeof mapDispatchToProps> & FormikValues & SelectorProps;

const CustomerSelector: React.FC<Props>  = ({getCustomers, field, touched, errors, ...props}) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const customers = useSelector((state: RootState) => getCustomersArray(state))


  return (
    <FormControl
      style={styles.formControl}
      error={(touched && touched.customer_id) && !!(errors && errors.customer_id)}
    >
      <InputLabel htmlFor={field.name}>Select Name</InputLabel>
      <Select
        {...field}
        id={field.name}
        margin="dense"
        style={styles.selectEmpty}
        {...props}
      >
        {
          customers.map(customer => (
            <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{(touched && touched.customer_id)  && (errors && errors.customer_id)}</FormHelperText>
    </FormControl>
  )
}



export default connect(null, mapDispatchToProps)(CustomerSelector);