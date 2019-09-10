import React from 'react';
import { Route } from 'react-router-dom';
import Customers from './components/Customers/Customers';


const Router: React.FC = () => {
    return (
      <Route exact path='/customers' component={Customers} />
    );
}

export default Router;