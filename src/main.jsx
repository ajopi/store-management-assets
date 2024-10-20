import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DefaultRouter from "./routes/DefaultRouter";
import "./styles/globalStyle.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DefaultRouter />
  </StrictMode>
);
