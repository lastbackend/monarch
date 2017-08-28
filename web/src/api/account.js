import {requestJSON} from "../utils";

const api_host = process.env.REACT_APP_AUTH_API_HOST;

class Account {

  static Fetch() {
    let uri = [api_host, "user"].join("/");
    return requestJSON("GET", uri, null, true);
  }

}

export default Account