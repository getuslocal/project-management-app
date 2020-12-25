import api from './api';

const setAuthToken = (token) => {
  if (token) {
    // If token already exists, set it on axious header.
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    // If token does not exist (ie: user logout and token of auth state becomes null),
    // delete auth header and remove token from localstorage.
    console.log('Remove auth header...');
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
