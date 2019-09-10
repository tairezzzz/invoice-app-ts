import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';






const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b2dfdb',
    },
    secondary: {
      light: '#d1c4e9',
      main: '#b39ddb',
      contrastText: '#e3f2fd',
    },
    // red: {
    //   main: '#ef5350'
    // },
  },
});

const app = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
