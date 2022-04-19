import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const dom = document.getElementById("root");

if (dom) {
  ReactDOM.createRoot(dom).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log("root element is required.");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
