import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import DoughnutChart from './DoughnutChart/DoughnutChart';
import IssueTypes from './IssueTypes/IssueTypes';
import AssignedList from './AssignedList/AssignedList';
import IssueHistory from './IssueHistory/IssueHistory';
import ProjectOverview from './ProjectOverview/ProjectOverview';
import {
  Row,
  SectionContainer,
  SectionTitle,
  SectionContent,
} from '../DashBoard.style';

const ProjectDashBoard = ({ dashboardParams, tickets }) => {
  return (
    <Fragment>
      <Row>
        <SectionContainer width="55%">
          <ProjectOverview projectId={dashboardParams} />
        </SectionContainer>
        <SectionContainer width="43%" noBoxShadow={true} >
          <IssueTypes />
        </SectionContainer>
      </Row>
      <Row>
        <SectionContainer width="49%">
          <SectionTitle>Issue Status</SectionTitle>
          <DoughnutChart />
        </SectionContainer>
        <SectionContainer width="49%">
          <SectionTitle>Assigned to me</SectionTitle>
          <SectionContent height="400px">
            <AssignedList />
          </SectionContent>
        </SectionContainer>
      </Row>
      <Row>
        <SectionContainer width="100%" >
          <SectionTitle>Tickets History</SectionTitle>
          <SectionContent height="450px" style={{ padding: ' 0 ', position: 'relative' }}>
            <IssueHistory projectId={dashboardParams} tickets={tickets} />
          </SectionContent>
        </SectionContainer>
      </Row>
    </Fragment>
  )
}

ProjectDashBoard.propTypes = {

}

export default ProjectDashBoard
