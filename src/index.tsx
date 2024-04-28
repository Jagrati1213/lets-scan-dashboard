import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/logout",
        element: "Logout",
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
