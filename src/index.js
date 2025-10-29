import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);

if ("serviceWorker" in navigator) {
   navigator.serviceWorker.register("/sw.js");
}
