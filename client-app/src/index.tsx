import ReactDOM from "react-dom/client";
import "./app/layout/style.css";
import { store, StoreContext } from "./app/stores/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} /> <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </StoreContext.Provider>
  </React.StrictMode>
);
