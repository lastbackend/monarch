import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {browserHistory, Router} from "react-router";

import routes from "./routes";

import {configureStore} from "./utils";
import getStore from "./store";

const store = configureStore(getStore());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store)}/>
  </Provider>,
  document.getElementById('root')
);
