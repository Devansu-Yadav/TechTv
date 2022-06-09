import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { makeServer } from "./server";
import { 
  VideoDataProvider,
  AuthenticationProvider, 
  FormErrorProvider,
  UserDataProvider 
} from "common/context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <FormErrorProvider>
        <UserDataProvider>
          <VideoDataProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </VideoDataProvider>
        </UserDataProvider>
      </FormErrorProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
