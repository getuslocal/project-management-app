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
import api from '../../../../shared/utils/api';
import { selectProjectById } from '../../../../redux/projects/projects.selectors';
import { selectTicketsOfUser } from '../../../../redux/tickets/tickets.selectors';
import { selectUser } from '../../../../redux/auth/auth.selectors';
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

const ProjectsBoard = ({ component: { title, tabs }, baseUrl, projectInfo, tickets, userProfile, ...props }) => {
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);
  const [membersList, setMembersList] = useState({});
  const members = projectInfo.members;
  const { project, tab } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const projectUri = baseUrl + '/' + project;
  const currentRoute = tab ? tab : '';
  useEffect(() => {
    // console.log('useEffect')
    store.dispatch(getTicketsByProjectId(props.match.params.project));
    const getMembersdata = async (members) => {
      try {
        if (!members) return;
        let tmp = {};
        for (const memberId of members) {
          const memberInfo = await api.get(`/users/${memberId}`);
          const memberData = memberInfo.data;
          tmp = {...tmp, [memberData._id]: memberData}
        };
        setMembersList(tmp);
      } catch (err) {
        console.error(err)
      }
    }
    getMembersdata(members)
  }, []);

  return (
    <>
      {
        isNewIssueModalOpen ? <NewIssueModal setIsNewIssueModalOpen={setIsNewIssueModalOpen} currentProjectId={project} membersList={membersList} userProfile={userProfile}/> : <></>
      }
      <TopNavigationBar title={projectInfo.key} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      {
        !!membersList? (
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
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.match.params.project),
  tickets: selectTicketsOfUser,
  userProfile: selectUser,
});

export default connect(mapStateToProps, null)(ProjectsBoard);
