import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand } from "@coreui/react";
// import DefaultHeaderDropdown from "./DefaultHeaderDropdown";
import Logo from "../../assets/output-mobile.png";
import eC from "../../assets/Ec.png";
import sygnet from "../../assets/images/logo/sygnet.svg";

function VotingHeader(props) {
  return (
    <React.Fragment>
      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <NavLink href="/">
            <strong>Home</strong>
          </NavLink>
        </NavItem>
      </Nav>

      <AppNavbarBrand
        full={{ src: Logo, width: 200, alt: "" }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: "" }}
      />

      <div>
        <img src={eC} style={{ width: "35%" }} />
      </div>
    </React.Fragment>
  );
}

export default VotingHeader;
