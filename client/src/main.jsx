import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000'

ReactDOM.createRoot(document.getElementById('root')).render(
        <App />,
)
