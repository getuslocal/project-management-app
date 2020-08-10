import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_ERROR_MESSAGE,
} from './auth.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
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
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        // loading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        // loading: false
      };
    // @todo : may remove this one if not needed.
    case AUTH_ERROR:
      return state;
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
        loading: false,
        user: null
      };
    case REFRESH_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: undefined
      }
    default:
      return state;
  }
};

export default authReducer;
