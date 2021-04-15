import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "../node_modules/react-redux";
import {createStore} from "redux"
import rootReducer from "./components/reducers/index"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);

