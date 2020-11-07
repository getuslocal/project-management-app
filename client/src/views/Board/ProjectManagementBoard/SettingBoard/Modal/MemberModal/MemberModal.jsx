import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from '../../../../../../shared/components/Button/Button';
import { Margin } from '../../../../../../shared/utils/global';
import Icon from '../../../../../../shared/components/Icon/Icon';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import { selectProjectById } from '../../../../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../../../../redux/members/members.selectors';
import { updateProject } from '../../../../../../redux/projects/projects.actions';
import {
  Container,
  Content,
  ModalContainer,
  Title,
  Description,
  TextButton,
  InnerWrapper,
  ButtonsContainer,
  List,
  ListLeft,
  ListCenter,
  Name,
  Position,
  Email,
  Role,
  Table,
  TableHeader,
  TableData,
  BodyRow,
  NewUserButton,
  RemoveButton,
  SelectItem
} from './MemberModal.style';

const MemberModal = ({ project, memberList, updateProject, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { _id: projectId, members: projectMembers, owner: projectLead } = project;
  const isMinimumLength = (projectMembers.length === 1);

  const addMember = (memberId) => {
    const updatedMemberList = [...projectMembers, memberId];
    updateMembers(updatedMemberList)
  }

  const removeMember = (memberId) => {
    const updatedMemberList = projectMembers.filter(id => id !== memberId);
    updateMembers(updatedMemberList)
  }

  const updateMembers = (updatedMemberList) => {
    const formValue = {
      members: updatedMemberList
    }
    updateProject(projectId, formValue)
  }

  const closeModal = () => {
    props.history.push(props.match.url)
  }

  return (
    <ModalContainer>
      <Container >
        <Content>
          <Title>Project Members</Title>
          <Description>
            Add or remove project members. If you remove a member, the member will lose access to the project.<br />
            <span>&#42;</span> A project must have at least one member.<br />
            {/* <span>&#42;</span> Admin can access to every project even if removed as a project member. */}
          </Description>
          <InnerWrapper>
            <Table>
              <thead>
                <tr>
                  <TableHeader width="">Member</TableHeader>
                  <TableHeader width="">Role</TableHeader>
                  <TableHeader width="">Position</TableHeader>
                  <TableHeader width="90px"></TableHeader>
                </tr>
              </thead>
              <tbody>
                {
                  projectMembers.map(projectMember => {
                    const memberData = memberList.find(member => member._id === projectMember);
                    return (
                      memberData && (
                        <BodyRow key={projectMember}>
                          <TableData>
                            <List>
                              <ListLeft>
                                <Icon type="user-icon" imageUrl={memberData.pictureUrl} size={32} top={2} />
                              </ListLeft>
                              <ListCenter>
                                <Name>{memberData.name}</Name>
                                <Email>{memberData.email}</Email>
                              </ListCenter>
                            </List>
                          </TableData>
                          <TableData>
                            <Role>{memberData.role}</Role>
                          </TableData>
                          <TableData>
                            <Role>{memberData.position}</Role>
                          </TableData>
                          <TableData>
                            {
                              !isMinimumLength && <RemoveButton onClick={() => removeMember(projectMember)}>Remove</RemoveButton>
                            }
                          </TableData>
                        </BodyRow>
                      )
                    )
                  })
                }
              </tbody>
            </Table>
            <Margin top={16} bottom={16} style={{position: 'relative'}}>
              <NewUserButton text="+ Add user" onClick={() => setIsMenuOpen(true)} />
              <SelectMenu
                isActive={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                onChange={(option) => addMember(option.key)}
                options={memberOptions(projectMembers, memberList, projectLead)}
                renderValue={({ value: member }) => renderValue(member)}
              />
            </Margin>
          </InnerWrapper>
          <ButtonsContainer>
            <TextButton onClick={closeModal}>Back</TextButton>
          </ButtonsContainer>
        </Content>
      </Container>
    </ModalContainer>
  )
}

const memberOptions = (projectMembers, memberList, projectLead) => (
  memberList.filter(member => !projectMembers.includes(member._id) && member._id !== projectLead).map(member => ({
    key: member._id,
    value: member,
  }))
);

const renderValue = (member) => {
  return (
    <SelectItem>
      <Icon type="user-icon" imageUrl={member.pictureUrl} size={24} top={2} />
      <Name>{member.name}</Name>
      <Position>{member.position} &#47; {member.role}</Position>
    </SelectItem>
  )
}

MemberModal.propTypes = {

}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.projectId),
  memberList: selectMembers
});

export default connect(mapStateToProps, { updateProject })(MemberModal);
