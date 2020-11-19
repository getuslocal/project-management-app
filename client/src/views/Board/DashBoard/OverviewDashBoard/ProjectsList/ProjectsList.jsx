import React from 'react'
import PropTypes from 'prop-types'
import ProjectBlock from './ProjectBlock/ProjectBlock'
import {
  SectionTitle,
  ListContainer,
  Container
} from './ProjectsList.style'

export const ProjectsList = ({ projects, members, tickets }) => (
  <Container>
    <SectionTitle>Your projects</SectionTitle>
    <ListContainer>
      {
        Object.values(projects).map(project => (
          <ProjectBlock
            key={project._id}
            project={project}
            members={members}
            tickets={tickets.filter(ticket => (ticket.projectId === project._id))} />
        ))
      }
    </ListContainer>
  </Container>
);

ProjectsList.propTypes = {
  projects: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  tickets: PropTypes.array.isRequired,
}

export default ProjectsList;
