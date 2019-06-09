import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCurrentUser } from '../../redux/actions'
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
                <a href="#planner" onClick={e => {this.props.updateCurrentUser(0)}}>
                  <span className="sidebar-mini">P</span>
                  <span className="sidebar-normal">Planner</span>
                </a>
                <a href="#installer" onClick={e => {this.props.updateCurrentUser(1)}}>
                  <span className="sidebar-mini">I</span>
                  <span className="sidebar-normal">Installer</span>
                </a>
                <a href="#viewer" onClick={e => {this.props.updateCurrentUser(2)}}>
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
    currentUser: state.users[state.currentUserID]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentUser: id => dispatch(updateCurrentUser(id))
  }
}

SidebarUserMenu = connect(mapStateToProps, mapDispatchToProps)(SidebarUserMenu)

export default SidebarUserMenu
