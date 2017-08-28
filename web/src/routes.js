import React from "react";
import {IndexRoute, Redirect, Route} from "react-router";
import App from "./app";
import * as layout from "./layouts";


export default (store) => {

  let AuthProtection = function (nextState, transition) {
    const state = store.getState();
    if (!state.session.isAuthorized) transition({pathname: '/signin'});
  };

  let RedirectToHome = function (nextState, transition) {
    const state = store.getState();
    if (state.session.isAuthorized) transition({pathname: '/'});
  };

  return (
    <Route path="/" component={App}>

      <IndexRoute onEnter={AuthProtection} component={layout.DashboardPageList}/>

      {/*************** Auth **************/}

      <Route onEnter={RedirectToHome} path="/signin" component={layout.AccountPageSignIn}/>

      {/*************** Account **************/}

      <Route onEnter={AuthProtection} path="/account" component={layout.AccountPageList}/>
      <Route onEnter={AuthProtection} path="/account/:account" component={layout.AccountPageInfo}/>

      {/*************** Default **************/}

      <Route path='/404' component={layout.NotFoundPage}/>
      <Redirect from='*' to='/404'/>
    </Route>
  );
};
