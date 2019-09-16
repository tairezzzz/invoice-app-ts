import React from 'react';
import { connect, useSelector} from 'react-redux';
import { Dispatch } from 'redux';
import { getEntities as getProductsSelector } from '../../../store/products/selectors';
import { getIsPostInvoiceLoading, getIsUpdateInvoiceLoading } from '../../../store/invoices-requests/selectors';

import { Formik, Form, Field, FieldArray} from 'formik';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ColorButtonGreen from '../../../shared/components/Buttons/ColorButtonGreen';
import { useStyles } from './styles';

import CustomerSelector from './utility/CustomerSelector';
import InvoiceItemForm from './InvoiceItemForm';
import Total from './utility/Total';

import { isDiscount, required } from '../../../shared/validators/validators';
import { RootState } from '../../../store/index';
import { calculateInvoiceItemsTotal, makeItemsQuantityNumber } from './utility/utils'
import { Actions as ProductsActions } from '../../../store/products/actions';
import { InvoiceItem } from '../../../shared/interfaces/invoice';


interface FormProps {
  initialValues?: {
    customer_id: string,
    discount: number,
    items: any,
  }
  _id?: string;
  buttonText?: string;
  onSubmit?: (data: any) => void;
  isEdit?: boolean;
  isView?: boolean;
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProducts: () => dispatch(ProductsActions.getProducts()),
});

type Props = ReturnType<typeof mapDispatchToProps> & FormProps;

const InvoiceForm: React.FC<Props> = ({
                                        getProducts,
                                        onSubmit,
                                        initialValues = {customer_id: '', discount: 0, items: [{product_id: '', quantity: 1}]},
                                        _id,
                                        isEdit,
                                        isView,
                                        buttonText = 'Save',
                                        ...props}) => {
  const styles = useStyles();

  const productsEntities = useSelector((state: RootState) => getProductsSelector(state))
  const isPostInvoiceLoading = useSelector((state: RootState) => getIsPostInvoiceLoading(state))
  const isUpdateInvoiceLoading = useSelector((state: RootState) => getIsUpdateInvoiceLoading(state))


  const handleProductChange = (arrayHelpers: any, index: number) => {
    const items = arrayHelpers.form.values[arrayHelpers.name];
    if (index >= (items.length -1)) {
      arrayHelpers.push({quantity: 1, product_id: ''});
    }
  }

  const handleRemovingInvoiceItem = (arrayHelpers: any, index: number) => {
    arrayHelpers.remove(index)
  }

  return (
    <Container>
      <Paper className={styles.wrapper}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={({items, discount, customer_id}, {setSubmitting}) => {

            const filteredItems = items.filter((item: InvoiceItem) => item.product_id)
            const reducedItems = makeItemsQuantityNumber(filteredItems)

            const total = calculateInvoiceItemsTotal(reducedItems, discount, productsEntities)

            const payload = {
              _id,
              items: reducedItems,
              discount,
              customer_id,
              total,
            }

            if(onSubmit) {
              onSubmit(payload)
            }

            setSubmitting(false);
          }}
        >

          {({values, handleChange}) => (

            <Form>
              <Field
                name="customer_id"
                validate={required}
                component={CustomerSelector}
                disabled={isView}
              />

              <div className={styles.main}>
                <Paper className={styles.items}>

                  <List>
                    <ListItem>
                      <ListItemText className={styles.product}>Products</ListItemText>
                      <ListItemText className={styles.quantity}>Q-ty</ListItemText>
                      <ListItemText className={styles.price}>Price ($)</ListItemText>
                    </ListItem>
                    <Divider />

                    <FieldArray name="items"
                                render={arrayHelpers => (
                                  <InvoiceItemForm
                                    name={'items'}
                                    values={values}
                                    onProductChange={(index: number) => handleProductChange(arrayHelpers, index)}
                                    onRemovingInvoiceItem={(index: number) => handleRemovingInvoiceItem(arrayHelpers, index)}
                                    handleChange={handleChange}
                                    isView={isView}
                                    {...props}
                                  />
                                )}
                    />
                    <Divider />

                    <ListItem>
                      <ListItemText className={styles.totalHeader}>Total</ListItemText>
                      <ListItemText className={styles.total}>
                        <Field
                          name="total"
                          component={Total}
                        />
                      </ListItemText>
                    </ListItem>
                  </List>

                  <div className={isView ? styles.view : styles.buttonWrapper}>
                    <ColorButtonGreen
                      type="submit"
                      disabled={isPostInvoiceLoading || isUpdateInvoiceLoading}
                      // style={styles}
                    >
                      {buttonText}
                    </ColorButtonGreen>
                  </div>
                </Paper>

                <Paper className={styles.discount}>
                  <Typography variant="h6" align="center" gutterBottom>Discount (%)</Typography>
                  <Field
                    type="number"
                    name="discount"
                    label="discount"
                    validate={isDiscount}
                    disabled={isEdit || isView}
                    component={TextField}
                    className={styles.numberFormControl}
                    inputProps={{
                      min: 0,
                      max: 50
                    }}
                  />
                </Paper>
              </div>
            </Form>
          )}

        </Formik>
      </Paper>
    </Container>
  )
};



export default connect(null, mapDispatchToProps)(InvoiceForm);