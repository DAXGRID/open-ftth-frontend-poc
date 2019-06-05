import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCurrentUserByRole } from '../../redux/actions'
import { Collapse } from 'react-bootstrap'

class SidebarUserMenu extends Component {
  state = {
    openAvatar: false,
  }

  render() {
    return (
      <div className="user">
        <div className="photo">
          <img src={this.props.currentUser.avatar} alt="Avatar" />
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
              { this.props.currentUser.name }
              <b
                className={
                  this.state.openAvatar ? "caret rotate-180" : "caret"
                }
              />
            </span>
          </a>
          <Collapse in={this.state.openAvatar}>
            <ul className="nav">
              <li>
                <a href="#planner" onClick={e => {this.props.setUser("planner"); e.preventDefault()}}>
                  <span className="sidebar-mini">P</span>
                  <span className="sidebar-normal">Planner</span>
                </a>
                <a href="#installer" onClick={e => {this.props.setUser("installer"); e.preventDefault()}}>
                  <span className="sidebar-mini">I</span>
                  <span className="sidebar-normal">Installer</span>
                </a>
                <a href="#viewer" onClick={e => {this.props.setUser("viewer"); e.preventDefault()}}>
                  <span className="sidebar-mini">V</span>
                  <span className="sidebar-normal">Viewer</span>
                </a>
              </li>
            </ul>
          </Collapse>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.filter((user) => user.id === state.currentUserID)[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: role => dispatch(updateCurrentUserByRole(role))
  }
}

SidebarUserMenu = connect(mapStateToProps, mapDispatchToProps)(SidebarUserMenu)

export default SidebarUserMenu
