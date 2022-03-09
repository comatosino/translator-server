import React from "react";
import ReactDOM from "react-dom";
import Translator from "./Translator";

import { Provider } from "react-redux";
import { store } from "./store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Translator />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
