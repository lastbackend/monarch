import React from "react";
import PropTypes from "prop-types";

import Validator from "../utils/validator";


class AccountFormInfo extends React.Component {

  constructor(props) {
    super(props);
    const account = Object.assign({}, props.account || {meta: {}});
    this.state = {
      error: Object.assign({}, props.error || {}),
      data: {
        username: account.meta.username || "",
        email: account.meta.email || "",
      },
      pending: false,
      success: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({error: nextProps.error || {}});
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      error: Object.assign(this.state.error, {[name]: ""}),
      data: Object.assign(this.state.data, {[name]: value}),
      pending: false,
      success: false
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = this.state.data;
    let error = {};

    error.username = Validator.UsernameField(data.username);
    error.email = Validator.EmailField(data.email);

    for (let key in error) {
      if (error[key] !== null && error[key] !== "") {
        this.setState({error: Object.assign(this.state.error, error)});
        return
      }
    }

    this.props.submit(this.state.data).then(this.handleSuccess, this.handleError);
  };

  handleSuccess = () => {
    this.setState({success: true});
    setTimeout(() => this.setState({success: false}), 2000);
  };

  handleError = (error) => {
    let e = this.state.error;
    e.form = error.message;
    this.setState({error: Object.assign(this.state.error, e), pending: false});
  };

  handleDisabled = () => {
    return this.state.pending;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className={`form-group ${!!this.state.error.form ? "has-danger" : ""}`}>
          <h4 className="text-center text-danger">{this.state.error.form}</h4>
        </div>

        <div className={`form-group row ${!!this.state.error.username ? "has-danger" : ""}`}>
          <label htmlFor="usernameInput" className="col-sm-3 col-form-label">Username</label>
          <div className="col-sm-9">
            <input name="username" type="text" id="usernameInput"
                   className={`form-control form-control-sm ${!!this.state.error.username ? "form-control-danger" : ""}`}
                   value={this.state.data.username}
                   onChange={this.handleChange}
                   aria-describedby="username"/>
            <small className="form-control-feedback">{this.state.error.username}</small>
          </div>
        </div>

        <div className={`form-group row ${!!this.state.error.email ? "has-danger" : ""}`}>
          <label htmlFor="emailInput" className="col-sm-3 col-form-label">Email</label>
          <div className="col-sm-9">
            <input name="email" type="email" id="emailInput"
                   className={`form-control form-control-sm ${!!this.state.error.email ? "form-control-danger" : ""}`}
                   value={this.state.data.email}
                   onChange={this.handleChange}
                   aria-describedby="email"/>
            <small className="form-control-feedback">{this.state.error.email}</small>
          </div>
        </div>

        <div className="col-sm-4 pull-right p-0">
          <button type="submit" disabled={this.handleDisabled()} className="btn btn-sm btn-block btn-outline-primary">
            Update {this.state.success && <i className="fa fa-check text-success pull-right" aria-hidden={true}/>}
          </button>
        </div>

      </form>
    )
  }
}

AccountFormInfo.propTypes = {
  error: PropTypes.object,
  account: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired
};

export default AccountFormInfo;