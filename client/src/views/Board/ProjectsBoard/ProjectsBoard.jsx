import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import queryString from 'query-string';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import CalendarBoard from './CalendarBoard/CalendarBoard';
import RoadMapBoard from './RoadMapBoard/RoadMapBoard';
import IssueDetail from './Modal/IssueDetail/IssueDetail';

const ProjectsBoard = ({
  component: { tabs },
  baseUrl,
  project,
  ...props
}) => {
  const { _id: projectId, name } = project
  const { tab } = props.match.params;
  const projectUri = baseUrl + '/' + projectId;
  const currentTab = (tab ? tab : '');
  // Get a value from a current url query string.
  const parsed = queryString.parse(props.location.search);
  const { selectedIssue } = parsed;

  return (
    <Fragment>
      <TopNavigationBar title={name} tabs={tabs} baseUrl={projectUri} currentTab={currentTab} />
      <Switch>
        <Route
          exact
          path={projectUri}
          render={() => <KanbanBoard project={project} />}
        />
        <Route
          exact
          path={`${projectUri}/roadmap`}
          render={() => <RoadMapBoard project={project} />}
        />
        <Route
          exact
          path={`${projectUri}/calendar`}
          render={() => <CalendarBoard project={project} />}
        />
      </Switch>
      {selectedIssue && (
        <IssueDetail
          currentProjectId={projectId}
        />
      )}
    </Fragment>
  )
}

ProjectsBoard.propTypes = {
  project: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default ProjectsBoard
