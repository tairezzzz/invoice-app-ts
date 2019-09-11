import { ajax } from 'rxjs/observable/dom/ajax';


const url = `https://api.invoice-app.2muchcoffee.com/api/customers`;

class CustomersRequestsService {

  getCustomers(){

    return ajax
      .getJSON(url)
  }

}


export const requestsService = new CustomersRequestsService();