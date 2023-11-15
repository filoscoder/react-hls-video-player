import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import router from "./router";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    width: 100vw;
    width: calc(100vw - (100vw - 100%));
    background-color: #303030;
    * {
      box-sizing: border-box;
    }
  }
`;

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </StrictMode>,
);
