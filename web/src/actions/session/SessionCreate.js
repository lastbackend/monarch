import {Session} from "../../api";
import {SESSION_CREATE_FAILURE, SESSION_CREATE_SUCCESS} from "../../constants";


const SuccessAction = (payload) => ({
  type: SESSION_CREATE_SUCCESS,
  payload
});

const FailureAction = (payload) => ({
  type: SESSION_CREATE_FAILURE,
  payload
});

export default (login, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    Session.Create(login, password)
      .then(response => {
        dispatch(SuccessAction(response));
        resolve(response);
      })
      .catch(error => {
        dispatch(FailureAction({error}));
        reject(error);
      });
  });
};