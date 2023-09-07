import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App";

const Home = lazy(() => import("./pages/home"));
const Player = lazy(() => import("./pages/player"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/player" element={<Player />}></Route>
    </Route>,
  ),
);

export default router;
