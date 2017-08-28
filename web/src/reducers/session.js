import {createReducer, Storage} from "../utils";
import {
  SESSION_CREATE_FAILURE,
  SESSION_CREATE_SUCCESS,
  SESSION_REMOVE_SUCCESS
} from "../constants";

const initialState = {
  isAuthorized: !!Storage().get("token")
};

export default createReducer(initialState, {
  [SESSION_CREATE_SUCCESS]: (state, payload) => {
    let newState = Object.assign({}, state);
    let token = (!!payload && !!payload.token) ? payload.token : null;
    Storage().set("token", token);
    newState.isAuthorized = true;
    return newState;
  },
  [SESSION_CREATE_FAILURE]: (state) => {
    return state;
  },
  [SESSION_REMOVE_SUCCESS]: (state) => {
    let newState = Object.assign({}, state);
    Storage().remove("token");
    newState.isAuthorized =  false;
    return newState;
  }
});