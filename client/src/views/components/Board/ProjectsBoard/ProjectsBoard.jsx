import React, { useEffect, useState } from 'react';
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
  Container,
  ProjectBoardTopContent,
  ProjectName,
  SearchInputContainer,
  SearchInput,
  CreateIssueButton,
  TopContentLeft,
  TopContentRight
} from './ProjectsBoard.style';
import NewIssueModal from './NewIssueModal/NewIssueModal';

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
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

  useEffect(() => {
    store.dispatch(getTicketsByProjectId(props.match.params.project));
  }, []);

  const { project, tab } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const projectUri = baseUrl + '/' + project;
  const currentRoute = tab ? tab : '';
  // console.log(props.match) // match.url =  "/app/projects/5f3b5f40e919715784ea0ac0/roadmap".

  return (
    <>
      {
        isNewIssueModalOpen ? <NewIssueModal setIsNewIssueModalOpen={setIsNewIssueModalOpen}  currentProjectId={project} /> : <></>
      }
      <TopNavigationBar title={projectInfo.key} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      {
        Object.keys(projectInfo).length && tickets ? (
          <Container>
            <ProjectBoardTopContent>
              <TopContentLeft>
                <ProjectName>Projects / {projectInfo.name}</ProjectName>
                <CreateIssueButton onClick={() => setIsNewIssueModalOpen(true)}>Create issue</CreateIssueButton>
              </TopContentLeft>
              <TopContentRight>
                <SearchInputContainer className="icon-search">
                  <SearchInput />
                </SearchInputContainer>
              </TopContentRight>
            </ProjectBoardTopContent>
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
  projectInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.match.params.project),
  tickets: selectTicketsOfUser,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ProjectsBoard);
