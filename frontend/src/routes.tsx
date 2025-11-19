import Home from "./pages/Home";
import Schedules from "./pages/Schedules";
import NotFound from "./pages/NotFound";

export const routes = [
  {
    path: "/",
    element: <Home />,
    name: "home",
  },
  {
    path: "/schedules",
    element: <Schedules />,
    name: "schedules",
  },
  {
    path: "*",
    element: <NotFound />,
    name: "not_found",
  },
];
