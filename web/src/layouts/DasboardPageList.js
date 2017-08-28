import React from "react";
import {connect} from "react-redux";


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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(DashboardPageList);

