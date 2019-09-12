import React from 'react';
import { Route } from 'react-router-dom';
import Customers from './components/Customers/Customers';
import Products from './components/Products/Products';
import Invoices from './components/Invoices/Invoices';


const Router: React.FC = () => {
    return (
      <>
          <Route exact path='/' component={Invoices} />
          <Route exact path='/customers' component={Customers} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/invoices' component={Invoices} />
      </>
    );
}

export default Router;