import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Dashboard from "../screens/adminScreens/Dashboard";
import Login from "../screens/adminScreens/Login";
import LandingPage from "../screens/landingPage/LandingPage";
import CandidateList from "../screens/votingScreens/CandidateList";
import Eligibility from "../screens/votingScreens/Eligibility";
// import FacialRecognition from "../screens/votingScreens/FacialRecognition";
import DefaultLayout from "../../containers/DefaultLayout/DefaultLayout";
import Register from "../screens/adminScreens/Register";
import Page500 from "./../../views/Pages/Page500/Page500";
import Result from "./../screens/Result Screen/Result";

import FacialRecognition from "../screens/votingScreens/FacialRecognition2y";

const Customroutes = () => {
  // debugger;
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/dashboard" name="Dashboard" component={DefaultLayout} />
          <Route exact path="/eligibility" component={Eligibility} />
          <Route exact path="/recognition" component={FacialRecognition} />
          <Route exact path="/candidates" component={CandidateList} />
          <Route exact path="/results" component={Result} />
          <Route exact path="/admin/login" component={Login} />
          <Route path="*" component={Page500} />

          <Redirect from="/admin" to="/admin/login" />
        </Switch>
      </div>
    </Router>
  );
};
export default Customroutes;
