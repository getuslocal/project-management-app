import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectProjects } from '../../../../redux/projects/projects.selectors'
import { selectMembers } from '../../../../redux/members/members.selectors'
import ProjectBlock from './ProjectBlock/ProjectBlock'
import {
  Container,
  SectionTitle,
  ListContainer
} from './ProjectsList.style'

export const ProjectsList = ({ projects, members }) => {
  return (
    <div>
      <SectionTitle>Your projects</SectionTitle>
      <ListContainer>
        {
          Object.values(projects).map(project => (
            <>
              <ProjectBlock key={project._id + '1'} project={project} members={members} />
              <ProjectBlock key={project._id + '2'} project={project} members={members} />
              <ProjectBlock key={project._id + '3'} project={project} members={members} />
              <ProjectBlock key={project._id + '4'} project={project} members={members} />
            </>
          ))
        }
      </ListContainer>
            {/* <Right>
        <RightTitle>Issue status</RightTitle>
        <TaskTypeCont>
          <TaskType><Icon type="ticket" isSolid={true} size={16} />To do <Number>18 issues</Number></TaskType>
        </TaskTypeCont>
        <TaskTypeCont>
          <TaskType><Icon type="spinner" isSolid={true} size={16} />In Progress <Number>18 issues</Number></TaskType>
        </TaskTypeCont>
        <TaskTypeCont>
          <TaskType><Icon type="check-square" size={16} />In Review <Number>18 issues</Number></TaskType>
        </TaskTypeCont>
        <TaskTypeCont>
          <TaskType><Icon type="glass-cheers" isSolid={true} size={16} />Done <Number>18 issues</Number></TaskType>
        </TaskTypeCont>
      </Right> */}
    </div>
  )
}


ProjectsList.propTypes = {
  projects: PropTypes.object.isRequired
}

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
  members: selectMembers
})

export default connect(mapStateToProps, null)(ProjectsList)
