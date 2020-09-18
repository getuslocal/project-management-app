import axios from 'axios';
import store from '../../redux/store';
import { logout } from '../../redux/auth/auth.actions';

// Set config defaults when creating the instance.
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/
api.interceptors.response.use(
  res => res,
  err => {
    console.log(err.response.data)
    if (err.response.data === 'Invalid Token' && err.response.status === 403) {
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default api;
