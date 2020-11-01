import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import SettingBoard from './SettingBoard/SettingBoard';
import EditProjectModal from './SettingBoard/Modal/EditProjectModal/EditProjectModal';
import MemberModal from './SettingBoard/Modal/MemberModal/MemberModal';
import {
  Container
} from './ProjectManagementBoard.style'

const ProjectManagement = ({
  component,
  baseUrl,
  ...props
}) => {
  const renderModal = () => {
    const parsedQueryString = queryString.parse(props.location.search);
    if (parsedQueryString.type === 'project') {
      return <EditProjectModal projectId={parsedQueryString.projectId} {...props} />
    } else if (parsedQueryString.type === 'member') {
      return <MemberModal projectId={parsedQueryString.projectId} {...props} />
    } else {
      return <></>
    }
  }
  return (
    <Fragment>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentRoute='' />
      <Container>
        <SettingBoard />
      </Container>
      {renderModal()}
    </Fragment>
  )
}

ProjectManagement.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
};

export default withRouter(ProjectManagement)