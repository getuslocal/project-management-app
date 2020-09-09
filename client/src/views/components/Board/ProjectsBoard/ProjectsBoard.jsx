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
import { selectTickets, selectIsTicketsLoaded, selectUserFilter, selectSearchFilter, selectFilters } from '../../../../redux/tickets/tickets.selectors';
import { selectUser } from '../../../../redux/auth/auth.selectors';
import { selectMembersByProjectId } from '../../../../redux/members/members.selectors';
import { createStructuredSelector } from 'reselect';
import { getTicketsByProjectId, filterTicketsByUser, removeUserFilter, filterTicketsBySearch, clearAllFilters } from '../../../../redux/tickets/tickets.actions';
import { getMembersByProjectId } from '../../../../redux/members/members.actions';
import WithSpinner from '../../../../shared/components/WithSpinner/WithSpinner';
import {
  Container,
  ProjectBoardTopContent,
  ProjectName,
  SearchInputContainer,
  SearchInput,
  CreateIssueButton,
  TopContentLeft,
  TopContentRight,
  Members,
  IconList,
  CustomIcon,
  ClearButton
} from './ProjectsBoard.style';
const KanbanBoardWithSpinner = WithSpinner(KanbanBoard);

const ProjectsBoard = ({
  component: { tabs },
  baseUrl,
  projectInfo,
  tickets,
  userFilter,
  userProfile,
  membersList,
  getTicketsByProjectId,
  getMembersByProjectId,
  filterTicketsByUser,
  filterTicketsBySearch,
  removeUserFilter,
  clearAllFilters,
  isLoading,
  filters,
  searchFilter,
  ...props
}) => {

  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);
  const members = projectInfo.members;
  const { project, tab } = props.match.params;
  const projectUri = baseUrl + '/' + project;
  const currentRoute = tab ? tab : '';
  const isFiltering = Object.keys(filters).some(key => filters[key].length > 0)

  useEffect(() => {
    getTicketsByProjectId(project)
    getMembersByProjectId(members, project)
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
          />
          :
          <></>
      }
      <TopNavigationBar title={projectInfo.key} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      <Container>
        <ProjectBoardTopContent>
          <TopContentLeft>
            <ProjectName>Projects / {projectInfo.name}</ProjectName>
            <CreateIssueButton onClick={() => setIsNewIssueModalOpen(true)}>Create issue</CreateIssueButton>
          </TopContentLeft>
          <TopContentRight>
            <SearchInputContainer className="icon-search">
              <SearchInput placeholder="Filter issues..." value={searchFilter} onChange={(e) => filterTicketsBySearch(e.target.value)} />
            </SearchInputContainer>
            <Members>
              <ul>
                {
                  Object.keys(membersList).map(key => {
                    // Check if the user is already filtered.
                    const isActive = userFilter.some(user => user === key);
                    return (
                      <IconList key={key} onClick={() => {
                        if (isActive) {
                          removeUserFilter(key)
                        } else {
                          filterTicketsByUser(key)
                        }
                      }}>
                        <CustomIcon isActive={isActive} iconStyle={{
                          base: 'userIcon',
                          type: membersList[key].pictureUrl,
                          size: '37px',
                        }} />
                      </IconList>
                    )
                  })
                }
              </ul>
            </Members>
            {
              isFiltering ?
                <ClearButton onClick={clearAllFilters}>Clear filters</ClearButton>
                :
                <></>
            }
          </TopContentRight>
        </ProjectBoardTopContent>
        <Switch>
          <Route exact path={projectUri} render={() =>
            <KanbanBoardWithSpinner isLoading={isLoading} projectInfo={projectInfo} />}
          />
          <Route exact path={`${projectUri}/roadmap`} component={RoadMapBoard} />
          <Route exact path={`${projectUri}/members`} component={MembersBoard} />
          <Route exact path={`${projectUri}/settings`} component={SettingsBoard} />
        </Switch>
      </Container>
    </>
  )
}

ProjectsBoard.propTypes = {
  projectInfo: PropTypes.object.isRequired,
  tickets: PropTypes.array.isRequired,
  userFilter: PropTypes.array.isRequired,
  userProfile: PropTypes.object.isRequired,
  membersList: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  getTicketsByProjectId: PropTypes.func.isRequired,
  getMembersByProjectId: PropTypes.func.isRequired,
  filterTicketsByUser: PropTypes.func.isRequired,
  removeUserFilter: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  projectInfo: selectProjectById(ownProps.match.params.project),
  tickets: selectTickets,
  userFilter: selectUserFilter,
  searchFilter: selectSearchFilter,
  isLoading: selectIsTicketsLoaded,
  userProfile: selectUser,
  membersList: selectMembersByProjectId(ownProps.match.params.project),
  filters: selectFilters,
});

const mapDispatchToProps = dispatch => ({
  getTicketsByProjectId: (projectId) => dispatch(getTicketsByProjectId(projectId)),
  getMembersByProjectId: (members, projectId) => dispatch(getMembersByProjectId(members, projectId)),
  filterTicketsByUser: (userId) => dispatch(filterTicketsByUser(userId)),
  filterTicketsBySearch: (value) => dispatch(filterTicketsBySearch(value)),
  removeUserFilter: (userId) => dispatch(removeUserFilter(userId)),
  clearAllFilters: () => dispatch(clearAllFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsBoard);
