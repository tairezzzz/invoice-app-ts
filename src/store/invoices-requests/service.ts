import { ajax } from 'rxjs/observable/dom/ajax';


const url = `https://api.invoice-app.2muchcoffee.com/api/invoices`;

class InvoicesRequestsService {

  getInvoices(){
    return ajax
      .getJSON(url)
  }

  deleteInvoice(id: unknown) {
    return ajax
      .delete(`${url}/${id}`)
  }

  postInvoice(invoice: unknown) {
    return ajax
      .post(
        url,
        JSON.stringify(invoice),
        {'Content-Type': 'application/json'}
      )
  }

}


export const requestsService = new InvoicesRequestsService();