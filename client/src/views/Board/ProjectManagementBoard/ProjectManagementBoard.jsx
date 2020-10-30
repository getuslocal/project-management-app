import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { getMembersOfOrganization } from '../../../redux/members/members.actions';
import { selectProjects } from '../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../redux/members/members.selectors';
import { selectOrganization } from '../../../redux/organizations/organizations.selectors';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import AddOrDropBoard from './AddOrDropBoard/AddOrDropBoard';
import {
  Container
} from './ProjectManagementBoard.style'

const ProjectManagement = ({
  component,
  baseUrl,
  tickets,
  getMembersOfOrganization,
  organization,
  projectList,
  memberList,
  ...props
}) => {
  const { management: currentTab } = props.match.params;
  const currentRoute = currentTab ? currentTab : '';

  useEffect(() => {
    getMembersOfOrganization(organization._id);
  }, [])

  return (
    <Fragment>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentRoute={currentRoute} />
      <Container>
        <Switch>
          <Route
            exact
            path={props.match.url}
            render={() => <AddOrDropBoard  projectList={projectList} memberList={memberList} />}
          />
        </Switch>
      </Container>
    </Fragment>
  )
}

ProjectManagement.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  organization: selectOrganization,
  projectList: selectProjects,
  memberList: selectMembers,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getMembersOfOrganization })
)(ProjectManagement);