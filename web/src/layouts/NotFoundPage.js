import React from "react";
import {Link} from "react-router";


const NotFoundPage = () => (
  <div className="content-wrapper">
    <div className="row page-404">
      <div className="col-md-4 offset-md-4 col-sm-12">
        <div className="page-404-header">404</div>
        <h3 className="font-bold">We couldn't find the page..</h3>
        <div className="page-404-desc">
          <p>Sorry, but the page you are looking for was either not found or does not exist.</p>

          <Link to="/">
            <button className="btn btn-primary">Go to Home</button>
          </Link>

        </div>
      </div>
    </div>
  </div>
);

export default NotFoundPage;