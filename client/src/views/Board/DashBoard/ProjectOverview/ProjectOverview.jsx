import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectProjectById } from '../../../../redux/projects/projects.selectors'
import { createStructuredSelector } from 'reselect'
import {
  Container,
  Top,
  NameCont,
  ProjectLead,
  ProjectLeadCont,
  Name,
  IconCont,
  Description,
  Category,
  Bottom,
  Member,
  BottomTitle,
  MemberList,
  CustomButton
} from './ProjectOverview.style'
import Icon from '../../../../shared/components/Icon/Icon'
import { selectMembers } from '../../../../redux/members/members.selectors'

export const ProjectOverview = ({ project, members }) => {
  const membersOfProject = members.filter(member => project.members.includes(member._id));
  const projectLead = membersOfProject.find(member => member._id === project.owner)
  return (
    <Container>
      <Top>
        <NameCont>
          <Name>{project.name}</Name>
          <IconCont>
            <Icon type="project-icon" imageUrl={project.projectIconUrl} size={70} />
          </IconCont>
        </NameCont>
        <Category>{project.category}</Category>
        <Description>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </Description>
      </Top>
      <Bottom>
        <ProjectLeadCont>
          <BottomTitle>Project Lead : </BottomTitle>
          <ProjectLead>
            <Icon type="user-icon" imageUrl={projectLead && projectLead.pictureUrl} size={30} top={1} />
            {projectLead && projectLead.name}
          </ProjectLead>
        </ProjectLeadCont>
        <Member>
          <BottomTitle>Team : </BottomTitle>
          <MemberList>
            {
              membersOfProject.map(member => {
                return (
                  <li>
                    <Icon type="user-icon" imageUrl={member.pictureUrl} size={30} top={1} />
                  </li>
                )
              })
            }
          </MemberList>
        </Member>
        <CustomButton text="View Board" variant="primary" />
      </Bottom>
    </Container>
  )
}

ProjectOverview.propTypes = {
  project: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.projectId),
  members: selectMembers
})

export default connect(mapStateToProps, null)(ProjectOverview)
