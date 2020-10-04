import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar/Sidebar';
import NotFound from '../NotFound/NotFound';
import { getProjectsOfUser } from '../../redux/projects/projects.actions';
import store from '../../redux/store';
import {
  Container
} from './Board.style';
import * as Components from './components';

const Board = ({
  user,
  roles,
  organization,
  ...props
}) => {

  useEffect(() => {
    store.dispatch(getProjectsOfUser(organization._id, user._id));
  }, []);

  return (
    <Fragment>
      <Sidebar user={user} roles={roles} />
      <Container>
        <Switch>
          {Object.values(roles).map(role => {
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
  user: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
  organization: PropTypes.object,
};

export default Board;
