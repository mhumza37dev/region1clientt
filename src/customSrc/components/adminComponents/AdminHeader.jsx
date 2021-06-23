import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'



function AdminHeader(props) {

        return (
            <React.Fragment>
              <AppSidebarToggler className="d-lg-none" display="md" mobile />
              <AppNavbarBrand
                full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
                minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
              />
              <AppSidebarToggler className="d-md-down-none" display="lg" />
              <Nav className="d-md-down-none" navbar>
                <NavItem className="px-3">
                  <NavLink href="/">Dashboard</NavLink>
                </NavItem>
                <NavItem className="px-3">
                  <NavLink href="#/users">Users</NavLink>
                </NavItem>
                <NavItem className="px-3">
                  <NavLink href="#">Settings</NavLink>
                </NavItem>
              </Nav>
              {/* <Nav className="ml-auto" navbar>
                <DefaultHeaderDropdown notif/>
                <DefaultHeaderDropdown tasks/>
                <DefaultHeaderDropdown mssgs/>
                <NavItem className="d-md-down-none">
                  <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
                </NavItem>
                <DefaultHeaderDropdown accnt/>
              </Nav> */}
              {/* <AppAsideToggler className="d-md-down-none" /> */}
              {/*<AppAsideToggler className="d-lg-none" mobile />*/}
            </React.Fragment>
    );
}

export default AdminHeader;
