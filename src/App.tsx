import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import NavTabs from './components/NavTabs/NavTabs';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavTabs/>
      <Router />
    </BrowserRouter>
  );
}

export default App;
