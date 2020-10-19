import React, { useState, useEffect, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import CalendarBoard from './CalendarBoard/CalendarBoard';
import RoadMapBoard from './RoadMapBoard/RoadMapBoard';
import AboutBoard from './AboutBoard/AboutBoard';
import { selectProjectById } from '../../../redux/projects/projects.selectors';
import { selectIsTicketsLoaded } from '../../../redux/tickets/tickets.selectors';
import { createStructuredSelector } from 'reselect';
import { getTicketsByProjectId } from '../../../redux/tickets/tickets.actions';
import { getMembersOfProject } from '../../../redux/members/members.actions';
import { setCurrentProjectId } from '../../../redux/projects/projects.actions';
import WithSpinner from '../../../shared/components/WithSpinner/WithSpinner';
import IssueDetail from './Modal/IssueDetail/IssueDetail';

const KanbanBoardWithSpinner = WithSpinner(KanbanBoard);

const ProjectsBoard = ({
  component: { tabs },
  baseUrl,
  project,
  getTicketsByProjectId,
  getMembersOfProject,
  setCurrentProjectId,
  isLoading,
  ...props
}) => {
  // console.log(project)
  const { members: projectMembers, _id: projectId, key: projectKeyName, name} = project
  const { tab } = props.match.params;
  const projectUri = baseUrl + '/' + projectId;
  const currentRoute = tab ? tab : '';
  let isModalOpen = false;
  // console.log('ProjectsBoard render')

  useEffect(() => {
    getTicketsByProjectId(projectId)
    getMembersOfProject(projectMembers)
    setCurrentProjectId(projectId)
  }, []);

  // Check if current url has query string.
  const parsed = queryString.parse(props.location.search);
  // If it has selectedIssue value, open issue modal.
  if (parsed.selectedIssue !== undefined) {
    isModalOpen = true;
  }

  return (
    <Fragment>
      <TopNavigationBar title={name} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      <Switch>
        <Route
          exact
          path={projectUri}
          render={() => <KanbanBoardWithSpinner isLoading={isLoading} project={project} />}
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
        <Route
          exact
          path={`${projectUri}/about`}
          render={() => <AboutBoard project={project} />}
        />
      </Switch>
      {(isModalOpen && !isLoading) && (
        <IssueDetail
          currentProjectId={projectId}
        />
      )}
    </Fragment>
  )
}

ProjectsBoard.propTypes = {
  project: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getTicketsByProjectId: PropTypes.func.isRequired,
  getMembersOfProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.match.params.project),
  isLoading: selectIsTicketsLoaded,
});

export default connect(
  mapStateToProps,
  { getTicketsByProjectId, getMembersOfProject, setCurrentProjectId }
)(ProjectsBoard);
