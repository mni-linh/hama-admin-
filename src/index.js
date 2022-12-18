import React from "react";
import ReactDOM from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

import { createStore } from "redux";

import { Provider } from "react-redux";

import rootReducer from "./redux/reducers";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";

import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";

const store = createStore(rootReducer);

const cookie = document.cookie;
const token = cookie
  ?.split(";")
  ?.filter((item) => item.includes("token="))[0]
  ?.split("=")[1];

document.title = "Ha Ma Corner | Admin";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>{token ? <Layout /> : <Login />}</React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
