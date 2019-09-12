import { ajax } from 'rxjs/observable/dom/ajax';


const url = `https://api.invoice-app.2muchcoffee.com/api/invoices`;

class InvoicesRequestsService {

  getInvoices(){

    return ajax
      .getJSON(url)
  }

}


export const requestsService = new InvoicesRequestsService();