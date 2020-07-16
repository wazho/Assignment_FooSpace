// Node modules.
import React from "react";
import ReactDOM from "react-dom";
// Components.
import App from "./components/App";
// Local modules.
import { logger } from "./utils/logger";

// Create logger.
const mylogger = logger("index");

// Catch the global exceptions.
try {
  const rootElement = document.getElementById("root");

  ReactDOM.render(<App />, rootElement);
} catch (e) {
  mylogger("Fatal Error Message %j", e.message);
  mylogger("Fatal Error Stack %j", e.stack);
}
