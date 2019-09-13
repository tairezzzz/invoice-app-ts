import { ajax } from 'rxjs/observable/dom/ajax';
import { Invoice, InvoiceItem } from '../../shared/interfaces/invoice';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


const url = `https://api.invoice-app.2muchcoffee.com/api/invoices`;

class InvoicesRequestsService {

  getInvoices(): Observable<Invoice[]>{
    return ajax
      .getJSON(url)
  }

  deleteInvoice(id: string) {
    return ajax
      .delete(`${url}/${id}`)
  }

  postInvoice({items, ...invoice}: any) {
    return ajax
      .post(
        url,
        JSON.stringify(invoice),
        {'Content-Type': 'application/json'}
      ).pipe(
        switchMap((response) => {
            console.log(response);
            return of(response.response);
          }  ))
  }

  postInvoiceItems(payload: InvoiceItem) {
    return ajax
      .post(
        `${url}/${payload.invoice_id}/items`,
        JSON.stringify(payload),
        {'Content-Type': 'application/json'}
      )
  }

  getInvoice(id: string) {
    return ajax
      .getJSON(`${url}/${id}`)
  }

  getInvoiceItems(id: string) {
    return ajax
      .getJSON(`${url}/${id}/items`)
  }

}


export const requestsService = new InvoicesRequestsService();