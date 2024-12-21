import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./content/Root";

const root = document.createElement("div");
root.id = "save-your-type-save-your-time";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
