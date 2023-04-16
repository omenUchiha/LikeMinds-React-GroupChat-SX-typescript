import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import LikeMinds from "likeminds-chat-beta";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const myClient = new LikeMinds({
  apiKey: process.env.REACT_APP_API_KEY!,
  baseUrl: process.env.REACT_APP_BASE_URL,
  baseUrlCaravan: process.env.REACT_APP_BASE_URL_CARAVAN,
});

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
