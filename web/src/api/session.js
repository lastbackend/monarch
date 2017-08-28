import {requestJSON} from "../utils";

const api_host = process.env.REACT_APP_AUTH_API_HOST;

class Session {

  static Create(login, password) {
    let uri = [api_host, "auth"].join("/");
    let body = {login: login, password: password};
    return requestJSON("POST", uri, body, false);
  }

}

export default Session