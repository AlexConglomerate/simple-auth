import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {logger} from "./services/log.servise";
import "react-toastify/dist/ReactToastify.css";


logger.init() //инициализация обработчика событий Sentry

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
