import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Customroutes from "./customSrc/routes/Customroutes";
import "./scss/style.css";
// import Customroutes from "./customSrc/routes/Customroutes";

// disable ServiceWorker
import registerServiceWorker from "./registerServiceWorker";
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Customroutes />
  </BrowserRouter>,
  document.getElementById("root")
);
// disable ServiceWorker
registerServiceWorker();
