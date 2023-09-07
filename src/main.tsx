import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import router from "./router";

const GlobalStyle = createGlobalStyle`
  ${reset}
  #root {
    width: 100vw;
    height: 100vh;
    background-color: #303030;
  }
`;

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </StrictMode>,
);
