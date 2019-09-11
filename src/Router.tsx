import React from 'react';
import { Route } from 'react-router-dom';
import Customers from './components/Customers/Customers';
import Products from './components/Products/Products';


const Router: React.FC = () => {
    return (
      <>
          <Route exact path='/customers' component={Customers} />
          <Route exact path='/products' component={Products} />
      </>
    );
}

export default Router;