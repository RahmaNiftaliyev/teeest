import React from "react";
import ReactDOM from "react-dom/client";

import { GOOGLE_RECAPTCHA_KEY } from "./Config/config.constant";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./Redux/store/store";
import App from "./App";

import "./i18n";
import "swiper/css";
import "./index.css";
import "antd/dist/antd.min.css";
import "./Assets/Styles/style.css";
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_KEY}>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </Provider>
      </GoogleReCaptchaProvider>
    </Router>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
