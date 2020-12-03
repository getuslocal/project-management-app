import {
  SET_ALERT,
  REMOVE_ALERT
} from './alert.types';
import short from 'short-uuid';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = short.generate();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
