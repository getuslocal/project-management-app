import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import {
  ListContainer,
  List,
  Close,
  Title,
  SelectItem,
  Name,
  SectionContainer,
  SectionTitle,
  Description
} from './Members.style';

const Members = ({ members, memberList, setMembers, projectLead }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const addMember = (member) => {
    setMembers([...members, member._id])
  }
  const removeMember = (event, memberId) => {
    // Prevent parent onClick firing.
    event.stopPropagation();
    setMembers(members.filter(member => member !== memberId))
  }
  const projectLeadData = memberList.find(member => member._id === projectLead);

  return (
    <SectionContainer>
      <SectionTitle >Project Members</SectionTitle>
      <ListContainer onClick={() => setIsMenuOpen(true)} >
        <SelectItem key={projectLeadData._id} className="selected-item">
          <Icon type="user-icon" imageUrl={projectLeadData.pictureUrl} size={22} top={1} />
          <Name>{projectLeadData.name}</Name>
          <Title>{projectLeadData.role} &#183; Project Lead</Title>
        </SelectItem>
        {
          members.filter(member => member !== projectLead).map(memberId => {
            const member = memberList.find(member => member._id === memberId);
            return (
              <SelectItem key={member._id} className="selected-item">
                <Fragment>
                  <Close onClick={(event) => removeMember(event, memberId)}>
                    <Icon type="close" isSolid={true} size={11} />
                  </Close>
                  <Icon type="user-icon" imageUrl={member.pictureUrl} size={22} top={1} />
                  <Name>{member.name}</Name>
                  <Title>{member.role}</Title>
                </Fragment>
              </SelectItem>
            )
          })
        }
      </ListContainer>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => addMember(option.value)}
        options={memberOptions(members, memberList, projectLead)}
        renderValue={({ value: member }) => renderValue(member)}
      />
      <Description>Click to search for a member to add. A project lead cannot be removed.</Description>
    </SectionContainer>
  )
}

const memberOptions = (members, memberList, projectLead) => (
  memberList.filter(member => !members.includes(member._id) && member._id !== projectLead).map(member => ({
    key: member._id,
    value: member,
  }))
);

const renderValue = (member) => {
  return (
    <SelectItem>
      <Icon type="user-icon" imageUrl={member.pictureUrl} size={24} top={2} />
      <Name>{member.name}</Name>
    </SelectItem>
  )
}

Members.propTypes = {

}

export default Members
