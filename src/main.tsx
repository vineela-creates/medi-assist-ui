import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MediAssistApp from "./MediAssistApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MediAssistApp />
  </StrictMode>
);
