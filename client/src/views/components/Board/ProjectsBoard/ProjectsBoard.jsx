import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import RoadMapBoard from './RoadMapBoard/RoadMapBoard';
import MembersBoard from './MembersBoard/MembersBoard';
import SettingsBoard from './SettingsBoard/SettingsBoard';
import { selectProjectById } from '../../../../redux/projects/projects.selectors';
import { selectIsTicketsLoaded } from '../../../../redux/tickets/tickets.selectors';
import { createStructuredSelector } from 'reselect';
import { getTicketsByProjectId } from '../../../../redux/tickets/tickets.actions';
import { getMembersByProjectId } from '../../../../redux/members/members.actions';
import WithSpinner from '../../../../shared/components/WithSpinner/WithSpinner';
import VizSensor from 'react-visibility-sensor';

const KanbanBoardWithSpinner = WithSpinner(KanbanBoard);

const ProjectsBoard = ({
  component: { tabs },
  baseUrl,
  project,
  // tickets, @todo: Figure out if drill up tickets state to here later.
  getTicketsByProjectId,
  getMembersByProjectId,
  isLoading,
  ...props
}) => {

  const { members: projectMembers, _id: projectId, key: projectKeyName } = project
  const { tab } = props.match.params;
  const projectUri = baseUrl + '/' + projectId;
  const currentRoute = tab ? tab : '';
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);

  useEffect(() => {
    getTicketsByProjectId(projectId)
    getMembersByProjectId(projectMembers, projectId)
  }, []);

  return (
    <>
      <VizSensor partialVisibility={true} onChange={(isVisible) => {
        if (isVisible) {
          setIsNavigationVisible(true)
          // console.log(true)
        } else {
          // console.log(false)
          // if (!isNavigationVisible) {
          //   return
          // }
          setIsNavigationVisible(false)
        }
      }}>
        <TopNavigationBar title={projectKeyName} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      </VizSensor>
      <Switch>
        <Route exact path={projectUri} render={() =>
          <KanbanBoardWithSpinner isLoading={isLoading} project={project} />
        }
        />
        <Route exact path={`${projectUri}/roadmap`} render={() =>
          <RoadMapBoard project={project} isNavigationVisible={isNavigationVisible}/>
        }
        />
        <Route exact path={`${projectUri}/members`} component={MembersBoard} />
        <Route exact path={`${projectUri}/settings`} component={SettingsBoard} />
      </Switch>
    </>
  )
}

ProjectsBoard.propTypes = {
  project: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getTicketsByProjectId: PropTypes.func.isRequired,
  getMembersByProjectId: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.match.params.project),
  isLoading: selectIsTicketsLoaded,
});

export default connect(
  mapStateToProps,
  { getTicketsByProjectId, getMembersByProjectId }
)(ProjectsBoard);
