import React, { Component, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from "@coreui/react";
import DefaultHeader from "../../../containers/DefaultLayout/DefaultHeader";
import DefaultFooter from "../../../containers/DefaultLayout/DefaultFooter";
import DefaultAside from "../../../containers/DefaultLayout/DefaultAside";
// sidebar nav config
// routes config
import routes from "../../../routes";

const Dashboard = () => {
  return (
    <div className="app">
      <AppHeader fixed>
        <DefaultHeader />
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <AppSidebarNav />
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          dasd
          <AppBreadcrumb appRoutes={routes} />
          <Container fluid>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Container>
        </main>
        <AppAside fixed hidden>
          <DefaultAside />
        </AppAside>
      </div>
      <AppFooter fixed>
        <DefaultFooter />
      </AppFooter>
    </div>
  );
};

export default Dashboard;
