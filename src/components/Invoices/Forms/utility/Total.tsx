import React from "react";
import { useSelector } from "react-redux";
import { getEntities as getProductsEntities } from "../../../../store/products/selectors";
import { calculateInvoiceItemsTotal } from "./utils";
import { FormikValues } from 'formik';
import { RootState } from '../../../../store/index';




type Props = FormikValues ;

const Total: React.FC<Props> = ({ form: {values: {items, discount}} }) => {

  const productsEntities = useSelector((state: RootState )=> getProductsEntities(state))

  const filteredItems = items.filter((item: {product_id: string}) => item.product_id)

  const total = calculateInvoiceItemsTotal(filteredItems, discount, productsEntities)

  return (
    <span>{isNaN(total) ? 0 : total}</span>
  )
}



export default Total;