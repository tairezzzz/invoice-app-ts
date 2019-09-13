import { Product } from '../../../../shared/interfaces/product';
import { InvoiceItemInput } from '../../../../shared/interfaces/invoice';
import { Entities } from '../../../../shared/interfaces/entities';




export const calculateInvoiceItemPrice = (products: Entities<Product>, item: InvoiceItemInput) => {
  return products[item.product_id] && products[item.product_id].price * item.quantity
}


export const calculateInvoiceItemsTotal = (items: InvoiceItemInput[], discount: number, products: Entities<Product>) => {
  const totalWithoutDiscount = items.reduce((acc, item) => {
    return acc + calculateInvoiceItemPrice(products, item)
  }, 0)

  const discountIntoMoney = (discount * totalWithoutDiscount) / 100
  const total = totalWithoutDiscount - discountIntoMoney
  const totalToFixed = +total.toFixed(2)

  return totalToFixed
}


export const makeItemsQuantityNumber = (items: InvoiceItemInput[]) => {
  return items.reduce((acc, item) => [
    ...acc,
      {...item, quantity: parseInt(`${item.quantity}`)}
      ], [] as InvoiceItemInput[])
}