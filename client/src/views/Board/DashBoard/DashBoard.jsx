import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './dashboard.css'
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import LineChart from './LineChart/LineChart';
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

// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: 'Visits',
    data: getRandomDateArray(20)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(20)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(10)
  });

  data.push({
    title: 'Data 4',
    data: getRandomArray(4)
  });

  return data;
}

const DashBoard = ({ component, baseUrl, tickets, ...props }) => {
  // Can get /app/dashboard/:dashboard? variable 
  // @todo: get tickets data based on the dashboard variable. 
  const [data, setData] = useState(null);

  const { dashboard: dashboardParams } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const currentRoute = dashboardParams ? dashboardParams : '';

  useEffect(() => {
    setData(getData())
  }, [])

  console.log(dashboardParams)

  return (
    <>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentRoute={currentRoute} />
      <Container>
        <Row>
          {
            !dashboardParams ? (
              <SectionContainer width="70%">
                <SectionTitle>Tasks</SectionTitle>
                <SectionContent height="350px">
                  <BarChart
                    data={data ? data[3].data : []}
                    title={data ? data[3].title : ''}
                  />
                </SectionContent>
              </SectionContainer>
            ) : (
                <SectionContainer width="70%">
                  <SectionTitle>Project Overview</SectionTitle>
                  <SectionContent height="350px">
                    <ProjectOverview projectId={dashboardParams} />
                  </SectionContent>
                </SectionContainer>
              )
          }
          <SectionContainer width="28%">
            <ProgressBar />
          </SectionContainer>
        </Row>
        {
          !dashboardParams ? (
            <Row style={{ marginBottom: '45px' }}>
              <ProjectsList />
            </Row>
          ) : (
              <Margin top={35} >
                <Row>
                  <SectionContainer noBoxShadow={true} >
                    <IssueTypes />
                  </SectionContainer>
                  <SectionContainer width="calc(100% - 420px - 2%)">
                    <SectionTitle>Ticket Status</SectionTitle>
                    <SectionContent height="330px">
                      <DoughnutChart
                        data={data ? data[3].data : []}
                        title={data ? data[3].title : ''}
                        colors={['rgba(15,53,169)', '#8CD7F8', 'rgba(101,186,67, .6)', 'rgba(86, 3, 173, .7)']}
                      />
                    </SectionContent>
                  </SectionContainer>
                </Row>
              </Margin>
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
                <SectionContainer width="100%">
                  <SectionTitle>Tickets History</SectionTitle>
                  <SectionContent height="400px">
                    <IssueHistory projectId={dashboardParams} tickets={tickets} />
                  </SectionContent>
                </SectionContainer>
              </Row>
            )
        }
      </Container>
    </>
  )
}

export default withRouter(DashBoard)
