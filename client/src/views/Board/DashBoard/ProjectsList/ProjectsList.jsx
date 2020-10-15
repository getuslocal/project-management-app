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
