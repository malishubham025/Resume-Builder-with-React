import React from "react";
import ReactDOM from "react-dom";
import Gpt from "./components/gpt";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./components/form";
import App from "./components/App";
import FirstResume from "./components/resume1";
import ResumeTwo from "./components/resume2";
import Template from "./components/templates";
import ResumeThree from "./components/resume3";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/templates",
    element: <Template />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/template1",
    element: <Form />,
  },
  {
    path: "/template2",
    element: <ResumeTwo />,
  },
  {
    path: "/template3",
    element: <ResumeThree />,
  },
]);
// Gpt();
ReactDOM.render(
  <RouterProvider router={router} />,
  document.querySelector(".root")
);
