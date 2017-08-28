import React from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";

import {AccountFormSignIn} from "../containers";
import {Session} from "../actions";


class AccountPageSignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: {}
    };
  }

  handleSubmit = (data) => {
    return this.props.dispatch(Session.Create(data.login, data.password))
      .then(() => browserHistory.push("/"));
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-sm-center vertical-center">
          <div className="col-sm-12 col-md-4">
            <AccountFormSignIn error={this.state.error} submit={this.handleSubmit}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AccountPageSignIn);
