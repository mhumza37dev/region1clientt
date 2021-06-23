import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
} from "reactstrap";
import { Avatar } from "@material-ui/core";

const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};

class DefaultHeaderDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleClick() {
    const { history } = this.props;
    history.push("/admin/login");
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <Avatar />
          {/* <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <NavLink to="/admin/login">
              {" "}
              <span>
                <i className="fa fa-lock"></i> Logout
              </span>
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { notif, accnt, tasks, mssgs } = this.props;
    return notif
      ? this.dropNotif()
      : accnt
      ? this.dropAccnt()
      : tasks
      ? this.dropTasks()
      : mssgs
      ? this.dropMssgs()
      : null;
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

export default DefaultHeaderDropdown;
