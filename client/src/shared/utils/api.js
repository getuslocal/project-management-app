import axios from 'axios';
import store from '../../redux/store';
import { logout } from '../../redux/auth/auth.actions';

// Set config defaults when creating the instance.
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Logout user if token does not exist on localstorage
    // before request is sent.
    if (!localStorage.token) {
      store.dispatch(logout());
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data === 'Invalid Token' && err.response.status === 403) {
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default api;
