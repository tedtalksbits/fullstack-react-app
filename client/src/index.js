import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './context/UserContext';
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();