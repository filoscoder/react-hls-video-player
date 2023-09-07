import { Loader } from "./components";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { RootErrorBoundary } from "./components/RootErrorBoundary";

const App = () => {
  return (
    <RootErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </RootErrorBoundary>
  );
};

export default App;
