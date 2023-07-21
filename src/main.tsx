import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Provider } from "react-redux";
import "./index.css";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
