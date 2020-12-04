import React, { Fragment } from 'react';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import OverviewDashBoard from './OverviewDashBoard/OverviewDashBoard';
import ProjectDashBoard from './ProjectDashBoard/ProjectDashBoard';
import {
  Container,
} from './DashBoard.style';

const DashBoard = ({ component, baseUrl, tickets, ...props }) => {
  const { dashboard: dashboardParams } = props.match.params
  const currentRoute = dashboardParams ? dashboardParams : '';
  return (
    <Fragment>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentTab={currentRoute} />
      <Container>
        {
          !dashboardParams ? (
            <OverviewDashBoard tickets={tickets} />
          ) : (
              <ProjectDashBoard projectId={dashboardParams} tickets={tickets.filter(ticket => ticket.projectId === dashboardParams)} />
            )
        }
      </Container>
    </Fragment>
  )
}

export default DashBoard
