import React from "react";
import Loadable from "react-loadable";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import CodeEditors from "./views/Editors/CodeEditors";
import DefaultLayout from "./containers/DefaultLayout";
import Voters from "./customSrc/screens/adminScreens/Voters";
import Candidate from "./customSrc/screens/adminScreens/Candidate";
import StartElection from "./customSrc/screens/adminScreens/StartElection";
import EndElection from "./customSrc/screens/adminScreens/EndElection";
import Charts from "./views/Charts/Charts.js";
import Page404 from "./views/Pages/Page404/Page404";

const Loading = () => {
  return <div>Loading...</div>;
};

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: Loading,
});

const routes = [
  { path: "/dashboard", name: "Home", component: Dashboard, exact: true },
  //{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/theme', name: 'Theme', component: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  {
    path: "/dashboard/election",
    name: "election",
    component: Page404,
    exact: true,
  },
  {
    path: "/dashboard/election/startelection",
    name: "Breadcrumbs",
    component: StartElection,
  },
  {
    path: "/dashboard/election/EndElection",
    name: "Breadcrumbs",
    component: EndElection,
  },

  {
    path: "/dashboard/voters",
    name: "Breadcrumbs",
    component: Voters,
  },
  {
    path: "/dashboard/candidates",
    name: "Breadcrumbs",
    component: Candidate,
  },

  {
    path: "/dashboard/analytics",
    name: "Breadcrumbs",
    component: Charts,
  },
];

export default routes;
