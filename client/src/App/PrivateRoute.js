import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../shared/components/WithSpinner/Spinner';
import { selectAuthInfo } from '../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, checkUserCredentials, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !checkUserCredentials ? (
        <Spinner />
      ) : isAuthenticated && user.orgId && user.role ? (
        <Component {...props} user={user} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: selectAuthInfo,
});

export default connect(mapStateToProps)(PrivateRoute);
