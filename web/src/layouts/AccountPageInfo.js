import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

import {Preloader} from "../components";
import {Account} from "../actions";
import {AccountFormInfo, AccountFormPasswordUpdate} from "../containers";


class AccountPageInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorInfo: {},
      errorPassword: {},
    };
  }

  componentDidMount() {

  }

  handleInfoUpdate = (data) => {
    return this.props.dispatch(Account.Update(this.props.params.account, data.email, data.username))
      .then(() => {})
  };

  handlePasswordUpdate = (data) => {
    return this.props.dispatch(Account.Password.Update(this.props.params.account, data.current, data.password));
  };

  render() {

    const {account} = this.props;

    if (!account) return <Preloader/>;

    return (
      <div className="content-wrapper">
        <div className="row">

          <div className="col-12">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-capitalize"><Link to={"/"}>Home</Link></li>
              <li className="breadcrumb-item text-capitalize"><Link to={"/account"}>Account</Link></li>
              <li className="breadcrumb-item text-capitalize active"><strong>{account.meta.username}</strong></li>
            </ol>
          </div>

          <div className="col-sm-12">
            <div className="h3">Profile</div>
          </div>

          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12">
                <h2>General info</h2>
                <hr/>
                <AccountFormInfo account={account} error={this.state.errorInfo}
                                 submit={this.handleInfoUpdate}/>
              </div>


              <div className="col-sm-12">
                <h2>Security info</h2>
                <hr/>
                <AccountFormPasswordUpdate account={account} error={this.state.errorPassword}
                                           submit={this.handlePasswordUpdate}/>
              </div>
            </div>
          </div>
          <div className="col-sm-6">

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    account: state.account[props.params.account]
  }
};

export default connect(mapStateToProps)(AccountPageInfo);
