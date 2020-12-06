import React from 'react'
import PropTypes from 'prop-types'
import ProjectBlock from './ProjectBlock/ProjectBlock'
import {
  SectionTitle,
  ListContainer,
  Container,
  NoProjectsText
} from './ProjectsList.style'

export const ProjectsList = ({ projects, members, tickets }) => (
  <Container>
    <SectionTitle>Your projects</SectionTitle>
    {
      Object.keys(projects).length > 0 ? (
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
      ) : (
        <NoProjectsText>No projects created</NoProjectsText>
      )
    }
  </Container>
);

ProjectsList.propTypes = {
  projects: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  tickets: PropTypes.array.isRequired,
}

export default ProjectsList;
