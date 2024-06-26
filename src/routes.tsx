import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Artists from "./pages/TopArtists";
import Tracks from "./pages/TopTracks";

export const Router = () => {
  const routes = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/artists",
      component: Artists,
    },
    {
      path: "/tracks",
      component: Tracks,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ component: Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
