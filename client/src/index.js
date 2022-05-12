//Импорт всех необходимых модулей и компонентов
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {store} from "./reducers";
import {Provider} from "react-redux";

//Функция отрисовки страницы
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);