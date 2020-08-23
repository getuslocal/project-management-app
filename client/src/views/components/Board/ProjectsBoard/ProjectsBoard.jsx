import React, { useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import { selectProjectById } from '../../../../redux/projects/projects.selectors';
import { selectTicketsOfUser } from '../../../../redux/tickets/tickets.selectors';
import { createStructuredSelector } from 'reselect';
import { getTicketsByProjectId } from '../../../../redux/tickets/tickets.actions';
import store from '../../../../redux/store';
import {
  Container
} from './ProjectsBoard.style';

const RoadMap = () => (
  <h1>RoadMap</h1>
)
const Members = () => (
  <h1>Members</h1>
)
const Settings = () => (
  <h1>Settings</h1>
)

const ProjectsBoard = ({ component: { title, tabs }, baseUrl, projectInfo, tickets, ...props }) => {

  useEffect(() => {
    store.dispatch(getTicketsByProjectId(props.match.params.project));
  }, []);

  const { project, tab } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const projectUri = baseUrl + '/' + project;
  const currentRoute = tab ? tab : '';
  // console.log(props.match) // match.url =  "/app/projects/5f3b5f40e919715784ea0ac0/roadmap".
  // console.log(projectInfo);
  return (
    <>
      <TopNavigationBar title={title} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      {
        Object.keys(projectInfo).length && tickets ? (
          <Container>
            {/* <SubContenter>
              <h3>{projectInfo.key}</h3>
              <h4>{tab ? tab : 'Board'}</h4>
            </SubContenter> */}
            <Switch>
              <Route exact path={projectUri} render={() => <KanbanBoard projectInfo={projectInfo} tickets={tickets} />} />
              <Route exact path={`${projectUri}/roadmap`} component={RoadMap} />
              <Route exact path={`${projectUri}/members`} component={Members} />
              <Route exact path={`${projectUri}/settings`} component={Settings} />
            </Switch>
          </Container>
        ) : (
            <p>loading...</p>
          )
      }
    </>
  )
}

ProjectsBoard.propTypes = {
  projectInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.match.params.project),
  tickets: selectTicketsOfUser,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ProjectsBoard);
