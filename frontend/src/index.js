import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <GoogleOAuthProvider clientId="303005444465-uf6jr9i2m22odbvjopn3bsgaga19qrgo.apps.googleusercontent.com">
      <App />
        </GoogleOAuthProvider>
       
      </Provider>
    </Router>
  </React.StrictMode>
);
