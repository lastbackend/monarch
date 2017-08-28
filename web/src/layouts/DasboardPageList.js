import React from "react";
import {connect} from "react-redux";

import {SideNav, StatsSessionList, StatsFormSessionCreate} from "../containers";


class DashboardPageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    return (
      <div>

        <div className="row">

          <div className="col-12">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-capitalize active"><strong>Home</strong></li>
            </ol>
          </div>

          <div className="col-12">
            <div className="clearfix">
              <div className="pull-left">
                <h1 className="mt-4 pb-2">Session stats info</h1>
              </div>
              <div className="pull-right">
                <SideNav title="Create game session" children={<StatsFormSessionCreate/>}/>
              </div>
            </div>
          </div>

          <div className="col-12">
            <StatsSessionList/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(DashboardPageList);

