import { Loader } from "./components";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { RootErrorBoundary } from "./components/RootErrorBoundary";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  #root {
    width: 100vw;
    height: 100vh;
  }
`;

const App = () => {
  return (
    <RootErrorBoundary>
      <Suspense fallback={<Loader />}>
        <GlobalStyle />
        <Outlet />
      </Suspense>
    </RootErrorBoundary>
  );
};

export default App;
