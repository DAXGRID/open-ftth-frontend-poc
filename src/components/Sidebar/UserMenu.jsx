import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import CurrentUserContext from "hooks/CurrentUserContext";

class SidebarUserMenu extends Component {
  state = {
    openAvatar: false
  };
  static contextType = CurrentUserContext;

  render() {
    return (
      <div className="user">
        <div className="photo">
          <img src={this.context.currentUser.avatar} alt="Avatar" />
        </div>
        <div className="info">
          <a
            href="#user"
            onClick={e => {
              e.preventDefault();
              this.setState({ openAvatar: !this.state.openAvatar });
            }}
          >
            <span>
              {this.context.currentUser.name}
              <b
                className={this.state.openAvatar ? "caret rotate-180" : "caret"}
              />
            </span>
          </a>
          <Collapse in={this.state.openAvatar}>
            <ul className="nav">
              <li>
                <a
                  href="#planner"
                  onClick={e => {
                    this.context.setCurrentUserID(1);
                  }}
                >
                  <span className="sidebar-mini">P</span>
                  <span className="sidebar-normal">Planner</span>
                </a>
                <a
                  href="#installer"
                  onClick={e => {
                    this.context.setCurrentUserID(2);
                  }}
                >
                  <span className="sidebar-mini">I</span>
                  <span className="sidebar-normal">Installer</span>
                </a>
                <a
                  href="#viewer"
                  onClick={e => {
                    this.context.setCurrentUserID(3);
                  }}
                >
                  <span className="sidebar-mini">V</span>
                  <span className="sidebar-normal">Viewer</span>
                </a>
              </li>
            </ul>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default SidebarUserMenu;
