import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectProjectById } from '../../../../redux/projects/projects.selectors'
import { createStructuredSelector } from 'reselect'
import {
  Container,
  Top,
  NameCont,
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
  return (
    <Container> 
      <Top>
        <NameCont>
          <IconCont>
            <Icon type="project-icon" imageUrl={project.projectIconUrl} size={45}/>
          </IconCont>
          <Name>{project.name}</Name>
        </NameCont>
        <Category>{project.category}</Category>
        <Description>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </Description>
      </Top>
      <Bottom>
        <Member>
          <BottomTitle>Member : </BottomTitle>
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
