import React, { useState, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../shared/components/Spinner/Spinner';
import Sidebar from '../../views/components/Sidebar/Sidebar';
import { selectRoleComponents } from '../../redux/roles/roles.selectors';

// @todo : add spinner while loading so that the landingpage is not exposed.

const PrivateRoutes = ({ auth: { isAuthenticated, loading }, roleComponents, ...props }) => {
  console.log(roleComponents)
  return (
    loading ?
      <Spinner />
      :
      (isAuthenticated ?
        <Fragment>
          <Sidebar {...props} />
          {/* <Switch>
          {roleComponents.map((component) => (
            <Route
              exact
              key={component.id}
              component={Routes[component.component]}
              path={`${props.match.path}${component.url}`}
            />
          ))}
          <Route component={NotFound} />
        </Switch> */}
        </Fragment>
        :
        <Redirect to="/" />)
  );
}
// <Route
//   {...rest}
//   render={props =>
//     loading ? (
//       <Spinner />
//     ) : isAuthenticated ? (
//       <Component {...props} />
//     ) : (
//       <Redirect to="/" /> 
//     )
//   }
// />

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  // roleComponents: selectRoleComponents(state.auth.user.role)(state),
});

export default connect(mapStateToProps)(PrivateRoutes);
