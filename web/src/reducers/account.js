import {createReducer} from "../utils";
import {ACCOUNT_FETCH_FAILURE, ACCOUNT_FETCH_SUCCESS,} from "../constants";

const initialState = {};

const convert = (payload) => {
  return {
    meta: payload.meta || {}
  }
};

export default createReducer(initialState, {
  [ACCOUNT_FETCH_SUCCESS]: (state, payload) => {
    let newState = Object.assign({}, state);
    newState = newState || {};
    let item = convert(payload);
    newState[item.meta.id] = item;
    return newState;
  },
  [ACCOUNT_FETCH_FAILURE]: (state) => {
    return state;
  },
});