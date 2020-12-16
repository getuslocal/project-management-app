import api from '../../shared/utils/api';
import { setAlert } from '../alert/alert.actions';
import { updateMember } from '../members/members.actions';
import { updateRolesWithNewRole } from '../roles/roles.actions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REMOVE_TOKEN,
  REFRESH_ERROR_MESSAGE,
  USER_UPDATED,
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

// Remove token
export const removeToken = () => ({ type: REMOVE_TOKEN });

// Refresh error message
export const refreshErrorMessage = () => ({ type: REFRESH_ERROR_MESSAGE });

// Update User
export const updateUser = (userId, formData) => async dispatch => {
  try {
    const res = await api.post(`/users/update/${userId}`, formData);

    dispatch({ type: USER_UPDATED, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data, 'error'));
  }
};

// Update User Profile
export const updateUserProfile = (userId, formData) => async dispatch => {
  try {
    const res = await api.post(`/users/update/profile/${userId}`, formData);

    dispatch({ type: USER_UPDATED, payload: res.data });

    // Update the user in member state.
    dispatch(updateMember(userId, res.data));

    // Attach an alert.
    dispatch(setAlert('Your profile has been updated!', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data, 'error'));
  }
};

// Update User role.
export const updateUserRole = (userId, newRole) => async dispatch => {
  try {
    const res = await api.post(`/users/update/role/${userId}`, { role: newRole });

    // Update the user in member state.
    dispatch(updateMember(userId, res.data));

    const userName = res.data.name;

    // Attach an alert.
    dispatch(setAlert(`${userName}'s role has been updated to ${newRole}`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data, 'error'));
  }
};

// Update User role.
export const updateCurrentUserRole = (userId, newRole) => async dispatch => {
  try {
    const res = await api.post(`/users/update/role/${userId}`, { role: newRole });
    const userName = res.data.name;

    // Update the user in auth state.
    dispatch({ type: USER_UPDATED, payload: res.data });

    // Update the user in member state.
    dispatch(updateMember(userId, res.data));

    // Update the roles.
    dispatch(updateRolesWithNewRole(newRole));

    // Attach an alert.
    dispatch(setAlert(`${userName}'s role has been updated to ${newRole}`, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data, 'error'));
  }
};
