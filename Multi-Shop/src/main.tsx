import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthContexts.tsx";
import { LatestSellingProvider } from "./LatestSellingContext/LatestSellingContext.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./Store/Store.ts";
import { Provider } from 'react-redux'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LatestSellingProvider>
            <App />
            <ToastContainer />
          </LatestSellingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
    </Provider>
  </StrictMode>
);
