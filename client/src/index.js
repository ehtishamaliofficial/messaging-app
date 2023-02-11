import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider,extendTheme} from "@chakra-ui/react"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
    colors: {
        brand: {
            100: "#f7fafc",
            900: "#1a202c",
        }
    }
})
root.render(
      <Provider store={store}>
      <BrowserRouter>
      <ChakraProvider theme={theme} >
           <App />
      </ChakraProvider>
      </BrowserRouter>
      </Provider>
);

