import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './dashboard.css'
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import LineChart from './LineChart/LineChart';
import BarChart from './BarChart/BarChart';
import DoughnutChart from './DoughnutChart/DoughnutChart';
import MembersList from './MembersList/MembersList';
import IssueTypes from './IssueTypes/IssueTypes';
import AssignedList from './AssignedList/AssignedList';
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


const DashBoard = ({ component, baseUrl, projectMap, ...props }) => {
  // Can get /app/dashboard/:dashboard? variable 
  // @todo: get tickets data based on the dashboard variable. 
  const [data, setData] = useState(null);

  const { dashboard } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const currentRoute = dashboard ? dashboard : '';

  useEffect(() => {
    setData(getData())
  }, [])

  // console.log(data)

  return (
    <>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentRoute={currentRoute} />
      <Container>
        <Row>
          <IssueTypes />
        </Row>
        <Row>
          <SectionContainer width="59%">
            <SectionTitle>Created vs Resolved</SectionTitle>
            <SectionContent height="350px">
              <LineChart
                data={data ? data[0].data : []}
                title={data ? data[0].title : ''}
                color="#5603ad"
              />
            </SectionContent>
          </SectionContainer>
          <SectionContainer width="39%">
            <SectionTitle>Ticket Status</SectionTitle>
            <SectionContent height="340px">
              <DoughnutChart
                data={data ? data[3].data : []}
                title={data ? data[3].title : ''}
                colors={['rgba(15,53,169)', '#8CD7F8', 'rgba(101,186,67, .6)', 'rgba(86, 3, 173, .7)']}
              />
            </SectionContent>
          </SectionContainer>
        </Row>
        <Row>
          <SectionContainer width="39%">
            <SectionTitle>Ticket Priority</SectionTitle>
            <SectionContent height="350px">
              <BarChart
                data={data ? data[3].data : []}
                title={data ? data[3].title : ''}
              />
            </SectionContent>
          </SectionContainer>
          <SectionContainer width="59%">
            <SectionTitle>Assigned to me</SectionTitle>
            <SectionContent height="350px">
              <AssignedList />
            </SectionContent>
          </SectionContainer>
        </Row>
        <Row>
          <SectionContainer width="59%">
            <SectionTitle>Tickets History</SectionTitle>
            <SectionContent height="350px">
            </SectionContent>
          </SectionContainer>
          <SectionContainer width="39%">
            <SectionTitle>Members</SectionTitle>
            <SectionContent height="350px">
              <MembersList />
            </SectionContent>
          </SectionContainer>
        </Row>


      </Container>
    </>
  )
}

export default withRouter(DashBoard)
