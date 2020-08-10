import api from '../../shared/utils/api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_ERROR_MESSAGE,
} from './auth.types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/users/authenticate');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    //Receive a token from server here.
    const res = await api.post('/users/register', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
  }
};

// Login User
export const login = formData => async dispatch => {
  try {
    const res = await api.post('/users/login', formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

// Refresh error message
export const refreshErrorMessage = () => ({ type: REFRESH_ERROR_MESSAGE });
