import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthContexts.tsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </Router>
  </StrictMode>
);
