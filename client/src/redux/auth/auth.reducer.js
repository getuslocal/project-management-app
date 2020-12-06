import {
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_UPDATED,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_ERROR_MESSAGE,
  REMOVE_TOKEN,
} from './auth.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  checkUserCredentials: false,
  user: null,
  errorMessage: undefined,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        checkUserCredentials: true,
        user: payload
      };
    case USER_UPDATED:
      return {
        ...state,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        checkUserCredentials: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        checkUserCredentials: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        checkUserCredentials: true,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        errorMessage: payload
      }
    case LOGIN_FAIL:
      return {
        ...state,
        errorMessage: payload
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    case REFRESH_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: undefined
      }
    // @todo: Remove this if not used.
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
};

export default authReducer;
