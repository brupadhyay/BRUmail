import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import MailProvider from "./context/MailContext.jsx";
import TrashProvider from "./context/TrashContext.jsx";
import SpamProvider from "./context/SpamContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MailProvider>
      <TrashProvider>
        <SpamProvider>
          <Router>
            <App />
          </Router>
        </SpamProvider>
      </TrashProvider>
    </MailProvider>
  </React.StrictMode>
);
