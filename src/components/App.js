// Node modules.
import React from "react";
// Components.
import { DiscountCalculator } from "./DiscountCalculator/";
// Styles.
import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App = () => (
  <div className="app">
    <div className="backgroundImage" />

    <div className="container">
      <h2>Welcome to FooSpace</h2>

      <DiscountCalculator />
    </div>
  </div>
);

export default App;
