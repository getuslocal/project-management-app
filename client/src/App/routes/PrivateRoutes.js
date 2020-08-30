import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../../views/components/Sidebar/Sidebar';
import { selectRoleComponents } from '../../redux/roles/roles.selectors';
import NotFound from '../../views/NotFound/NotFound';
// import Board from '../../views/components/Board/Board';
import { getProjectsOfOwner } from '../../redux/projects/projects.actions';
import store from '../../redux/store';
import {
  BoardContainer
} from '../../views/components/Board/Board.style';
import * as Roles from './roles';

const PrivateRoutes = ({ auth: { isAuthenticated, user }, roleComponents, projects, ...props }) => {
  useEffect(() => {
    store.dispatch(getProjectsOfOwner(user._id));
  }, []);
  // console.log(props.match) // "/app/projects" . params: {board: 'projects'}.
  // console.log(projects)
  return (
    isAuthenticated ? (
      <Fragment>
        <Sidebar user={user} roleComponents={roleComponents} />
        <BoardContainer>
          <Switch>
            {roleComponents.map(component => {
              const Component = Roles[component.component];
              return (
                <Route
                  key={component.id} //@todo: change the key with uuid.
                  path={`/app/${component.linkUrl}/${component.linkVariable}`}
                  render={() => <Component component={component} baseUrl={props.match.url} />}
                />
              )
            })}
            <Route component={NotFound} />
          </Switch>
        </BoardContainer>

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
// @todo: turn these to selectors.
const mapStateToProps = state => ({
  auth: state.auth,
  roleComponents: state.auth.user ? selectRoleComponents(state.auth.user.role)(state) : [],
  projects: state.projects
});

export default connect(mapStateToProps)(PrivateRoutes);
