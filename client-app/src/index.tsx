import ReactDOM from "react-dom/client";
import "./app/layout/style.css";
import { store, StoreContext } from "./app/stores/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material";
import { theme } from "./app/theme/theme";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <StoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} /> <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </StoreContext.Provider>
  </ThemeProvider>
);
