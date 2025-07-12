import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Aquí es donde se ajusta el basename */}
    <BrowserRouter basename="/webSiteEducacion">
      <App />
    </BrowserRouter>
  </StrictMode>
);
