import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import BarChart from './BarChart/BarChart';
import MembersList from './MembersList/MembersList';
import ProjectsList from './ProjectsList/ProjectsList';
import ProgressBar from './ProgressBar/ProgressBar';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectProjects } from '../../../../redux/projects/projects.selectors'
import { selectMembers } from '../../../../redux/members/members.selectors'
import { IssueTypes } from '../../../../shared/constants/issues';
import {
  Row,
  SectionContainer,
  SectionTitle,
  SectionContent,
} from '../DashBoard.style';

const OverviewDashBoard = ({ tickets, projects, members }) => {
  const nonEpicTickets = tickets.filter(ticket => ticket.issueType !== IssueTypes.EPIC);
  return (
    <Fragment>
      <Row>
        <SectionContainer width="68%">
          <SectionTitle>Tasks</SectionTitle>
          <SectionContent height="350px">
            <BarChart tickets={nonEpicTickets} projects={projects}/>
          </SectionContent>
        </SectionContainer>
        <SectionContainer width="30%">
          <ProgressBar tickets={nonEpicTickets} projects={projects} />
        </SectionContainer>
      </Row>
      <ProjectsList tickets={nonEpicTickets} projects={projects} members={members}/>
      <Row>
        <SectionContainer width="100%">
          <SectionTitle>Members</SectionTitle>
            <MembersList projects={projects} members={members} />
        </SectionContainer>
      </Row>
    </Fragment>
  )
}

OverviewDashBoard.propTypes = {

}

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
  members: selectMembers
})

export default connect(mapStateToProps, null)(OverviewDashBoard)
