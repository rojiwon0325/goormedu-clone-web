import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Common } from "components";
import reportWebVitals from "./reportWebVitals";
import "./styles/style.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Common.ErrorBoundary>
        <Common.Provider>
          <App />
        </Common.Provider>
      </Common.ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.log("element which id is root is required.");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
