import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import style from "./index.module.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
