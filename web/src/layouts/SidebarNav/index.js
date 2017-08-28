import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Link} from "react-router";

import {Account, Session} from "../../actions";

import "./styles.css";


class SidebarNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {

    if (this.props.session.isAuthorized) {
      this.props.dispatch(Account.Fetch())
    }

    const navBar = ReactDOM.findDOMNode(this).querySelector('nav.navbar');

    if (!!navBar) {
      const collapsibleNav = navBar.querySelector('div.navbar-collapse');
      const btnToggle = navBar.querySelector('button.navbar-toggler');

      navBar.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' || e.target.classList.contains('dropdown-toggle') || !collapsibleNav.classList.contains('show')) {
          return;
        }
        btnToggle.click();
      }, false);
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(Session.Remove());
  }

  isActive(path) {
    const match = this.props.location.pathname.split("/");
    return (match.length > 1 && match[1] === path) ? "active" : "";
  }

  render() {
    return (
      <div className="sidebar-nav">
        <nav className="navbar navbar-expand-lg navbar-light" role="navigation">

          <Link className="navbar-brand" to={"/"}>
            <img className="align-top d-lg-inline d-none" height="50" src="/logo.svg" alt="Trampbon"/>
            <img className="align-top d-lg-none" height="40" src="/logo.svg" alt="Trampbon"/>
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebar-toggle"
                  aria-controls="sidebar-toggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>


          <div className="collapse navbar-collapse sidebar-navbar-collapse" id="sidebar-toggle">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className={`nav-item ${this.isActive("")}`}>
                <Link to={"/"} className="nav-link" activeClassName={"active"}>
                  <i className="fa fa-bar-chart fa-lg"/>Dashboard
                </Link>
              </li>
              <li className={`nav-item ${this.isActive("module")}`}>
                <Link to={"/module"} className="nav-link" activeClassName={"active"}>
                  <i className="fa fa-cubes fa-lg"/>Modules
                </Link>
              </li>
              <li className={`nav-item ${this.isActive("partner")}`}>
                <Link to={"/partner"} className="nav-link" activeClassName={"active"}>
                  <i className="fa fa-users fa-lg"/>Partners
                </Link>
              </li>
              <li className={`nav-item ${this.isActive("game")}`}>
                <Link to={"/game"} className="nav-link" activeClassName={"active"}>
                  <i className="fa fa-gamepad fa-lg"/>Games
                </Link>
              </li>
              <li className={`nav-item ${this.isActive("account")}`}>
                <Link to={"/account"} className="nav-link" activeClassName={"active"}>
                  <i className="fa fa-user fa-lg"/>Account
                </Link>
              </li>
              <li className="nav-item d-lg-none" onClick={this.handleLogout}>
                <Link to={"/"} className="nav-link"><i className="fa fa-sign-out fa-lg"/>Sign
                  Out</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-logout d-lg-inline d-none">
            <ul className="navbar-nav">
              <li className="nav-item" onClick={this.handleLogout}>
                <Link to={"/"} className="nav-link"><i className="fa fa-sign-out fa-lg"/>Sign Out</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
      account: state.account,
      session: state.session
    }
  );
};

const mapDispatchToProps = (dispatch) => {
  return ({dispatch});
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav);
