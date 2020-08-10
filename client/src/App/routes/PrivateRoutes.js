import React, { useState, Fragment } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../shared/components/WithSpinner/WithSpinner';
import Sidebar from '../../views/components/Sidebar/Sidebar';
import { selectRoleComponents } from '../../redux/roles/roles.selectors';
import * as Routes from './index';
import NotFound from '../../views/NotFound/NotFound';

const PrivateRoutes = ({ auth: { isAuthenticated, loading, user }, roleComponents, ...props }) => {
  return (
    loading ? (
      <Spinner />
    ) : isAuthenticated ? (
      <Fragment>
        <Sidebar user={user} roleComponents={roleComponents} {...props} />
        <Switch>
          {roleComponents.map((component) => (
            <Route
              exact
              key={component.id}
              component={Routes[component.component]}
              path={`${props.match.path}${component.linkUrl}`}
            />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    ) : (
          <Redirect to="/" />
        )
  );
}

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
  roleComponents: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  roleComponents: selectRoleComponents(state.auth.user.role)(state),
});

export default withRouter(connect(mapStateToProps)(PrivateRoutes));
