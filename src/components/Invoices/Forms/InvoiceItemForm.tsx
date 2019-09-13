import React from 'react';
import { useSelector } from 'react-redux';
import { getEntities as getProductsEntities } from '../../../store/products/selectors';

import {Field, FormikValues} from 'formik';
import { TextField } from 'formik-material-ui';
import { ListItem, ListItemText }from '@material-ui/core';
import { useStyles} from './styles';

import ProductSelector from './utility/ProductSelector';
import { isQuantity, required } from '../../../shared/validators/validators';
import { calculateInvoiceItemPrice } from './utility/utils';
import {RootState} from '../../../store/index';





type Props = FormikValues;


const InvoiceItemForm: React.FC<Props> = ({
                                                           values: {items},
                                                           handleChange,
                                                           onRemovingInvoiceItem,
                                                           onProductChange,
                                                           ...props}) => {
  const styles = useStyles();

  const handleProductChange = (e: React.SyntheticEvent, index: number) => {
    handleChange(e);
    onProductChange(index)
  }

  const handleRemovingInvoiceItem = (index: number) => {
    onRemovingInvoiceItem(index)
  }

  const productsEntities = useSelector((state: RootState) => getProductsEntities(state))

  return (
    <>
      {items.map((item: object, index: number) => (
        <div key={index}>

          <ListItem>
            <ListItemText className={styles.product}>
              <Field
                name={`items.${index}.product_id`}
                component={ProductSelector}
                validate={items.length === 1 ? required : null}
                onChange={(e: React.SyntheticEvent) => handleProductChange(e, index)}
              />
            </ListItemText>

            <ListItemText className={styles.quantity}>
              <Field
                type="number"
                name={`items.${index}.quantity`}
                label="q-ty"
                component={TextField}
                validate={isQuantity}
                className={styles.numberFormControl}
                inputProps={{
                  min: 1,
                  max: 100
                }}
              />
            </ListItemText>

            <ListItemText className={styles.price}>
              {
                productsEntities[items[index].product_id]
                  ? (calculateInvoiceItemPrice(productsEntities, items[index])).toFixed(2)
                  : 0
              }
            </ListItemText>

            <ListItemText className={styles.remove}>
              {
                items[index].product_id
                  ?
                  <button
                    type="button"
                    className={styles.buttonRemove}
                    onClick={() => handleRemovingInvoiceItem(index)}
                  >
                    x
                  </button>
                  : null
              }
            </ListItemText>


          </ListItem>

        </div>
      ))}

    </>
  )
}



export default InvoiceItemForm;