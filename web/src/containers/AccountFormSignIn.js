import React from "react";
import PropTypes from "prop-types";

import Validator from "../utils/validator";


class AccountFormSignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: Object.assign({}, props.error || {}),
      data: {
        login: "",
        password: "",
      },
      pending: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({error: nextProps.error || {}});
  }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      error: Object.assign(this.state.error, {[name]: ""}),
      data: Object.assign(this.state.data, {[name]: value})
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = this.state.data;
    let error = {};

    error.login = Validator.LoginField(data.login);
    error.password = Validator.PasswordField(data.password);

    for (let key in error) {
      if (error[key] !== null && error[key] !== "") {
        this.setState({error: Object.assign(this.state.error, error)});
        return
      }
    }

    this.props.submit(data).then(this.handleSuccess, this.handleError)
  };

  handleSuccess = () => {
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

        <div className={`form-group ${!!this.state.error.login ? "has-danger" : ""}`}>
          <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-user" aria-hidden={true}/>
                  </span>
            <input type="text" className={`form-control ${!!this.state.error.login ? "form-control-danger" : ""}`}
                   name='login' placeholder="login"
                   value={this.state.data.login}
                   onChange={this.handleChange}/>
          </div>
          <small className="form-control-feedback">{this.state.error.login}</small>
        </div>

        <div className={`form-group ${!!this.state.error.password ? "has-danger" : ""}`}>
          <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-lock" aria-hidden={true}/>
                  </span>
            <input type="password"
                   className={`form-control ${!!this.state.error.password ? "form-control-danger" : ""}`}
                   name='password' placeholder="password"
                   value={this.state.data.password}
                   onChange={this.handleChange}/>
          </div>
          <small className="form-control-feedback">{this.state.error.password}</small>
        </div>

        <div className="form-group">
          <button type="submit" disabled={this.handleDisabled()} className="btn btn-block btn-outline-primary">
            Login
          </button>
        </div>

      </form>
    )
  }
}

AccountFormSignIn.propTypes = {
  error: PropTypes.object,
  submit: PropTypes.func.isRequired
};

export default AccountFormSignIn;

