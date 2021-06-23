import React from "react";
import Loadable from "react-loadable";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import CodeEditors from "./views/Editors/CodeEditors";
import DefaultLayout from "./containers/DefaultLayout";
import Voters from "./customSrc/screens/adminScreens/Voters";
import Candidate from "./customSrc/screens/adminScreens/Candidate";
import StartElection from "./customSrc/screens/adminScreens/StartElection";
import EndElection from "./customSrc/screens/adminScreens/EndElection";

const Loading = () => {
  return <div>Loading...</div>;
};

const Compose = Loadable({
  loader: () => import("./views/Apps/Email/Compose"),
  loading: Loading,
});

const Inbox = Loadable({
  loader: () => import("./views/Apps/Email/Inbox"),
  loading: Loading,
});

const Message = Loadable({
  loader: () => import("./views/Apps/Email/Message"),
  loading: Loading,
});

const Invoice = Loadable({
  loader: () => import("./views/Apps/Invoicing/Invoice"),
  loading: Loading,
});

const Breadcrumbs = Loadable({
  loader: () => import("./views/Base/Breadcrumbs"),
  loading: Loading,
});

const Cards = Loadable({
  loader: () => import("./views/Base/Cards"),
  loading: Loading,
});

const Carousels = Loadable({
  loader: () => import("./views/Base/Carousels"),
  loading: Loading,
});

const Collapses = Loadable({
  loader: () => import("./views/Base/Collapses"),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import("./views/Base/Dropdowns"),
  loading: Loading,
});

const Jumbotrons = Loadable({
  loader: () => import("./views/Base/Jumbotrons"),
  loading: Loading,
});

const ListGroups = Loadable({
  loader: () => import("./views/Base/ListGroups"),
  loading: Loading,
});

const Navbars = Loadable({
  loader: () => import("./views/Base/Navbars"),
  loading: Loading,
});

const Navs = Loadable({
  loader: () => import("./views/Base/Navs"),
  loading: Loading,
});

const Paginations = Loadable({
  loader: () => import("./views/Base/Paginations"),
  loading: Loading,
});

const Popovers = Loadable({
  loader: () => import("./views/Base/Popovers"),
  loading: Loading,
});

const ProgressBar = Loadable({
  loader: () => import("./views/Base/ProgressBar"),
  loading: Loading,
});

const Switches = Loadable({
  loader: () => import("./views/Base/Switches"),
  loading: Loading,
});

const Tabs = Loadable({
  loader: () => import("./views/Base/Tabs"),
  loading: Loading,
});

const Tooltips = Loadable({
  loader: () => import("./views/Base/Tooltips"),
  loading: Loading,
});

const BrandButtons = Loadable({
  loader: () => import("./views/Buttons/BrandButtons"),
  loading: Loading,
});

const ButtonDropdowns = Loadable({
  loader: () => import("./views/Buttons/ButtonDropdowns"),
  loading: Loading,
});

const ButtonGroups = Loadable({
  loader: () => import("./views/Buttons/ButtonGroups"),
  loading: Loading,
});

const Buttons = Loadable({
  loader: () => import("./views/Buttons/Buttons"),
  loading: Loading,
});

const LoadingButtons = Loadable({
  loader: () => import("./views/Buttons/LoadingButtons"),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import("./views/Charts"),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: Loading,
});

// issue with mispalced position of cm value for acync load
// const CodeEditors = Loadable({
//   loader: () => import('./views/Editors/CodeEditors'),
//   loading: Loading,
// });

const TextEditors = Loadable({
  loader: () => import("./views/Editors/TextEditors"),
  loading: Loading,
});

const AdvancedForms = Loadable({
  loader: () => import("./views/Forms/AdvancedForms"),
  loading: Loading,
});

const BasicForms = Loadable({
  loader: () => import("./views/Forms/BasicForms"),
  loading: Loading,
});

const GoogleMaps = Loadable({
  loader: () => import("./views/GoogleMaps"),
  loading: Loading,
});

const CoreUIIcons = Loadable({
  loader: () => import("./views/Icons/CoreUIIcons"),
  loading: Loading,
});

const Flags = Loadable({
  loader: () => import("./views/Icons/Flags"),
  loading: Loading,
});

const FontAwesome = Loadable({
  loader: () => import("./views/Icons/FontAwesome"),
  loading: Loading,
});

const SimpleLineIcons = Loadable({
  loader: () => import("./views/Icons/SimpleLineIcons"),
  loading: Loading,
});

const Alerts = Loadable({
  loader: () => import("./views/Notifications/Alerts"),
  loading: Loading,
});

const Badges = Loadable({
  loader: () => import("./views/Notifications/Badges"),
  loading: Loading,
});

const Modals = Loadable({
  loader: () => import("./views/Notifications/Modals"),
  loading: Loading,
});

const Toastr = Loadable({
  loader: () => import("./views/Notifications/Toastr"),
  loading: Loading,
});

const Calendar = Loadable({
  loader: () => import("./views/Plugins/Calendar"),
  loading: Loading,
});

const Draggable = Loadable({
  loader: () => import("./views/Plugins/Draggable"),
  loading: Loading,
});

const Spinners = Loadable({
  loader: () => import("./views/Plugins/Spinners"),
  loading: Loading,
});

const DataTable = Loadable({
  loader: () => import("./views/Tables/DataTable"),
  loading: Loading,
});

const Tables = Loadable({
  loader: () => import("./views/Tables/Tables"),
  loading: Loading,
});

const Colors = Loadable({
  loader: () => import("./views/Theme/Colors"),
  loading: Loading,
});

const Typography = Loadable({
  loader: () => import("./views/Theme/Typography"),
  loading: Loading,
});

const Widgets = Loadable({
  loader: () => import("./views/Widgets/Widgets"),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import("./views/Users/Users"),
  loading: Loading,
});

const User = Loadable({
  loader: () => import("./views/Users/User"),
  loading: Loading,
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404"),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
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
