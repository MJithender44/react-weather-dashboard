import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import App from "./App";
import { ThemeContextProvider } from "./context/ThemeContext";
import { WeatherUnitContextProvider } from "./context/WeatherUnitContext";
import { AddressContextProvider } from "./context/AddressContext";


ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <WeatherUnitContextProvider>
        <AddressContextProvider>
          <App />
        </AddressContextProvider>
      </WeatherUnitContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
