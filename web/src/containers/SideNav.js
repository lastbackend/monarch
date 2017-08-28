import React from "react";
import PropTypes from "prop-types";

import "../theme/sidenav.css"


class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(e) {
    e.preventDefault();
    this.setState({open: true})
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({open: false})
  }

  render() {
    return (
      <div>
        <button className="btn btn-sm btn-primary" onClick={this.handleOpen}>Create</button>
        <div className={`sidenav ${this.state.open ? "show" : ""}`}>
          <i className="fa fa-times closebtn" aria-hidden={true} onClick={this.handleClose}/>
          <h1>{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

SideNav.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default SideNav;