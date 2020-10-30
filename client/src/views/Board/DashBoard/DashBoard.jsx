import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import BarChart from './BarChart/BarChart';
import DoughnutChart from './DoughnutChart/DoughnutChart';
import MembersList from './MembersList/MembersList';
import IssueTypes from './IssueTypes/IssueTypes';
import ProjectsList from './ProjectsList/ProjectsList';
import AssignedList from './AssignedList/AssignedList';
import ProgressBar from './ProgressBar/ProgressBar';
import IssueHistory from './IssueHistory/IssueHistory';
import ProjectOverview from './ProjectOverview/ProjectOverview';
import { Margin } from '../../../shared/utils/global'
import {
  Container,
  Row,
  SectionContainer,
  SectionTitle,
  SectionContent,
} from './DashBoard.style';

const DashBoard = ({ component, baseUrl, tickets, ...props }) => {
  console.log(props)
  const { dashboard: dashboardParams } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const currentRoute = dashboardParams ? dashboardParams : '';
  console.log(dashboardParams)

  return (
    <Fragment>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentRoute={currentRoute} />
      <Container>
        <Row>
          {
            !dashboardParams ? (
              <Fragment>
                <SectionContainer width="68%">
                  <SectionTitle>Tasks</SectionTitle>
                  <SectionContent height="350px">
                    <BarChart />
                  </SectionContent>
                </SectionContainer>
                <SectionContainer width="30%">
                  <ProgressBar />
                </SectionContainer>
              </Fragment>
            ) : (
                <Fragment>
                  <SectionContainer width="59%">
                    <ProjectOverview projectId={dashboardParams} />
                  </SectionContainer>
                  <SectionContainer width="39%">
                    <ProgressBar />
                  </SectionContainer>
                </Fragment>
              )
          }
        </Row>
        {
          !dashboardParams ? (
            <Row >
              <ProjectsList />
            </Row>
          ) : (
              <Row>
                <SectionContainer width="39%" noBoxShadow={true} >
                  <IssueTypes />
                </SectionContainer>
                <SectionContainer width="59%">
                  <SectionTitle>Issue Status</SectionTitle>
                  <DoughnutChart />
                </SectionContainer>
              </Row>
            )
        }
        {
          !dashboardParams ? (
            <Row>
              <SectionContainer width="100%">
                <SectionTitle>Members</SectionTitle>
                <SectionContent height="400px">
                  <MembersList />
                </SectionContent>
              </SectionContainer>
            </Row>
          ) : (
              <Row>
                <SectionContainer width="49%" >
                  <SectionTitle>Tickets History</SectionTitle>
                  <SectionContent height="400px" style={{ padding: ' 0 ', position: 'relative' }}>
                    <IssueHistory projectId={dashboardParams} tickets={tickets} />
                  </SectionContent>
                </SectionContainer>
                <SectionContainer width="49%">
                  <SectionTitle>Assigned to me</SectionTitle>
                  <SectionContent height="400px">
                    <AssignedList />
                  </SectionContent>
                </SectionContainer>
              </Row>
            )
        }
      </Container>
    </Fragment>
  )
}

export default withRouter(DashBoard)
