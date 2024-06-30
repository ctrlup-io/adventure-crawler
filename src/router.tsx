/* eslint-disable react-refresh/only-export-components */
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./routes/login";
import Root from "./routes/root";
import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Scores = lazy(() => import("./components/Scores"));
const Logs = lazy(() => import("./components/Logs"));
const Backpack = lazy(() => import("./components/Backpack"));
const Shop = lazy(() => import("./components/Shop"));
const Adventures = lazy(() => import("./components/Adventures"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/scores",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Scores />
          </Suspense>
        ),
      },
      {
        path: "/logs",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Logs />
          </Suspense>
        ),
      },
      {
        path: "/adventures",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Adventures />
          </Suspense>
        ),
      },
      {
        path: "/backpack",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Backpack />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
