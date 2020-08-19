import React, { Fragment, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../../views/components/Sidebar/Sidebar';
import { selectRoleComponents } from '../../redux/roles/roles.selectors';
import NotFound from '../../views/NotFound/NotFound';
import Board from '../../views/components/Board/Board';
import { getProjectsOfOwner } from '../../redux/projects/projects.actions';
import store from '../../redux/store';

const PrivateRoutes = ({ auth: { isAuthenticated, user }, roleComponents, ...props }) => {
  useEffect(() => {
    store.dispatch(getProjectsOfOwner(user._id));
  }, []);

  return (
    isAuthenticated ? (
      <Fragment>
        <Sidebar user={user} roleComponents={roleComponents}/>
        <Switch>
          {roleComponents.map(component => (
            <Route
              key={component.id}
              path={`/app/${component.linkUrl}`}
              render={() => <Board component={component} {...props} />}
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
