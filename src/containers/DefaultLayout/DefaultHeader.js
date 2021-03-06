import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import DefaultHeaderDropdown from "./DefaultHeaderDropdown";
// import logo from '../../assets/img/brand/logo.svg'
import Logo from "../../customSrc/assets/DEVS-Logo.png";
import sygnet from "../../assets/img/brand/sygnet.svg";

import LogoMinimized from "../../customSrc/assets/N2.png";


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: Logo, width: 200, alt: "" }}
          minimized={{ src: LogoMinimized, width: 80  , height: 30, alt: "" }}
          
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/dashboard">Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown accnt />
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> 
        <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
