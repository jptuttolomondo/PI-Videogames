import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import axios from'axios'
import dotenv from 'dotenv'
dotenv.config() 

axios.defaults.baseURL=process.env.REACT_APP_API ||'http://localhost:3001';
const rootElement=document.getElementById("root");
render(
   <BrowserRouter>
        <App />
  </BrowserRouter>,
 rootElement
);

