import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
