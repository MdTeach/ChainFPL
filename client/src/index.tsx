import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID || "APP_ID";
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL || "APP_URL";

const Application = () => {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <MoralisDappProvider>
        <App />
      </MoralisDappProvider>
    </MoralisProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);
