import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import Login from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EditItem from "./components/EditItem.jsx";
import CreateItem from "./components/CreateItem.jsx";
import Product from "./components/Products.jsx";
import Modal from "./components/Modal.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "products/add",
        element: <CreateItem />,
      },
      {
        path: "products/edit/:id",
        element: <EditItem />,
      },
      {
        path: "logout",
        element: <Modal />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
