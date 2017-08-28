import React from "react";
import {connect} from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";


import {SidebarNav} from "./layouts";

import "./app.css";


injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: props.session.isAuthorized
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isAuth: nextProps.session.isAuthorized});
  };

  render() {
    return (
      <div>
        {this.state.isAuth && <SidebarNav {...this.props} />}
        <div className={`${!this.state.isAuth ? "" : "wrap"}`}>
          <div className="content container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(App);