import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../shared/components/WithSpinner/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, checkUserCredentials, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !checkUserCredentials ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Component {...props} user={user} />
      ) : (
        <Redirect to="/" /> 
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
