import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/home";
import App from "./App";
import Player from "./pages/player";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/player" element={<Player />}></Route>
    </Route>,
  ),
);

export default router;
