export interface Invoice {
  _id: string;
  customer_id: string;
  discount: number;
  total: number;
}

export interface InvoiceInput {
  _id?: string;
  customer_id: string;
  discount: number;
  total: number;
}

export interface InvoiceItem {
  _id: string;
  invoice_id: string;
  product_id: string;
  quantity: number;
}

export interface InvoiceItemInput {
  _id: string;
  product_id: string;
  quantity: number;
  invoice_id?: string;
}