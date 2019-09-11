import { ajax } from 'rxjs/observable/dom/ajax';


const url = `https://api.invoice-app.2muchcoffee.com/api/products`;

class ProductsRequestsService {

  getProducts(){

    return ajax
      .getJSON(url)
  }

}


export const requestsService = new ProductsRequestsService();