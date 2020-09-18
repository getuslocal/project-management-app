import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { selectRolesList } from '../../../redux/roles/roles.selectors';
import { selectAuthInfo } from '../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import NotFound from '../../NotFound/NotFound';
import { getProjectsOfOwner } from '../../../redux/projects/projects.actions';
import { getRoles } from '../../../redux/roles/roles.actions';
import store from '../../../redux/store';
import Spinner from '../../../shared/components/WithSpinner/Spinner';
import {
  Container
} from './Board.style';
import * as Components from './components';

const Board = ({
  auth: { isAuthenticated, user },
  roles,
  projects,
  ...props
}) => {

  // If the user is not authenticated, redirect to top page.
  if (!isAuthenticated) {
    return (
      <Redirect to="/" />
    )
  }
  
  useEffect(() => {
    store.dispatch(getRoles(user.role));
    store.dispatch(getProjectsOfOwner(user._id));
  }, []);
  
  // If roles state is still loading, return spinner.
  if (roles.length === 0) {
    return (
      <Spinner />
    )
  }

  return (
    <Fragment>
      <Sidebar user={user} roles={roles} />
      <Container>
        <Switch>
          {roles.map(role => {
            const Component = Components[role.component];
            return (
              <Route
                key={role.id}
                path={`/app/${role.linkUrl}/${role.linkVariable}`}
                render={() => <Component component={role} baseUrl={props.match.url} />}
              />
            )
          })}
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
}

Board.propTypes = {
  auth: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  auth: selectAuthInfo,
  roles: selectRolesList,
});

export default connect(mapStateToProps)(Board);
