import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import { VideoDataProvider } from "common/context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <VideoDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VideoDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
