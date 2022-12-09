import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/style.css";
import App from "./app/layout/App";
import { BrowserRouter } from "react-router-dom";
import { store, StoreContext } from "./app/stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </BrowserRouter>
);
