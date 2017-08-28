import {Storage} from "../../utils";
import {browserHistory} from "react-router";
import {SESSION_REMOVE_SUCCESS} from "../../constants";

export const SuccessAction = {
  type: SESSION_REMOVE_SUCCESS
};

export default () => (dispatch) => {
  Storage().remove("token");
  dispatch(SuccessAction);
  browserHistory.push("/signin");
};