import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import BarChart from './BarChart/BarChart';
import MembersList from './MembersList/MembersList';
import ProjectsList from './ProjectsList/ProjectsList';
import ProgressBar from './ProgressBar/ProgressBar';
import {
  Row,
  SectionContainer,
  SectionTitle,
  SectionContent,
} from '../DashBoard.style';

const OverviewDashBoard = ({ tickets }) => {
  return (
    <Fragment>
      <Row>
        <SectionContainer width="68%">
          <SectionTitle>Tasks</SectionTitle>
          <SectionContent height="350px">
            <BarChart />
          </SectionContent>
        </SectionContainer>
        <SectionContainer width="30%">
          <ProgressBar tickets={tickets} />
        </SectionContainer>
      </Row>
      <ProjectsList />
      <Row>
        <SectionContainer width="100%">
          <SectionTitle>Members</SectionTitle>
          <SectionContent height="400px">
            <MembersList />
          </SectionContent>
        </SectionContainer>
      </Row>
    </Fragment>
  )
}

OverviewDashBoard.propTypes = {

}

export default OverviewDashBoard
