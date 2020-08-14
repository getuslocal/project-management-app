import React, { useState, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../shared/components/WithSpinner/WithSpinner';
import Sidebar from '../../views/components/Sidebar/Sidebar';
import { selectRoleComponents } from '../../redux/roles/roles.selectors';
import * as Routes from './index';
import NotFound from '../../views/NotFound/NotFound';

const PrivateRoutes = ({ auth: { isAuthenticated, user }, roleComponents }) => {
  return (
    isAuthenticated ? (
      <Fragment>
        <Sidebar user={user} roleComponents={roleComponents} />
        <Switch>
          {roleComponents.map(({ id, linkUrl, component }) => (
            <Route
              exact
              key={id}
              component={Routes[component]}
              path={`/app${linkUrl}`}
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
  roleComponents: state.auth.user ? selectRoleComponents(state.auth.user.role)(state) : [],
});

export default connect(mapStateToProps)(PrivateRoutes);
