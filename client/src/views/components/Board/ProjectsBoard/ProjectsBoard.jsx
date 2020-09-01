import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import RoadMapBoard from './RoadMapBoard/RoadMapBoard';
import MembersBoard from './MembersBoard/MembersBoard';
import SettingsBoard from './SettingsBoard/SettingsBoard';
import NewIssueModal from './NewIssueModal/NewIssueModal';
import { selectProjectById } from '../../../../redux/projects/projects.selectors';
import { selectTicketsOfUser } from '../../../../redux/tickets/tickets.selectors';
import { selectUser } from '../../../../redux/auth/auth.selectors';
import { selectMembersByProjectId } from '../../../../redux/members/members.selectors';
import { createStructuredSelector } from 'reselect';
import { getTicketsByProjectId } from '../../../../redux/tickets/tickets.actions';
import { getMemebersByProjectId } from '../../../../redux/members/members.actions';
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

const ProjectsBoard = ({ component: { tabs }, baseUrl, projectInfo, tickets, userProfile, membersList, ...props }) => {
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);
  const members = projectInfo.members;
  const { project, tab } = props.match.params;
  const projectUri = baseUrl + '/' + project;
  const currentRoute = tab ? tab : '';
  useEffect(() => {
    store.dispatch(getTicketsByProjectId(props.match.params.project));
    store.dispatch(getMemebersByProjectId(members, project));
  }, []);

  return (
    <>
      {
        isNewIssueModalOpen ?
          <NewIssueModal
            setIsNewIssueModalOpen={setIsNewIssueModalOpen}
            currentProjectId={project}
            membersList={membersList}
            userProfile={userProfile}
            ticketsLength={tickets.length} />
          :
          <></>
      }
      <TopNavigationBar title={projectInfo.key} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      {
        // @todo: figure out if tickets should be loadded before the following.
        Object.keys(membersList).length > 0 ? (
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
              <Route exact path={`${projectUri}/roadmap`} component={RoadMapBoard} />
              <Route exact path={`${projectUri}/members`} component={MembersBoard} />
              <Route exact path={`${projectUri}/settings`} component={SettingsBoard} />
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
  tickets: PropTypes.array.isRequired,
  userProfile: PropTypes.object.isRequired,
  membersList: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.match.params.project),
  tickets: selectTicketsOfUser,
  userProfile: selectUser,
  membersList: selectMembersByProjectId(ownProps.match.params.project)
});

export default connect(mapStateToProps, null)(ProjectsBoard);
