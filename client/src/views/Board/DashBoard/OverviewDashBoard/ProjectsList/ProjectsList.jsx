import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectProjects } from '../../../../../redux/projects/projects.selectors'
import { selectMembers } from '../../../../../redux/members/members.selectors'
import ProjectBlock from './ProjectBlock/ProjectBlock'
import {
  SectionTitle,
  ListContainer,
  Container
} from './ProjectsList.style'

export const ProjectsList = ({ projects, members }) => {
  return (
    <Container>
      <SectionTitle>Your projects</SectionTitle>
      <ListContainer>
        {
          Object.values(projects).map(project => (
            <ProjectBlock key={project._id} project={project} members={members} />
          ))
        }
      </ListContainer>
    </Container>
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
