import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMembers } from '../../../../../../redux/members/members.selectors';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  SelectItem,
  AngleDownIcon,
} from '../IssueCreate.style';

const UnassignedText = styled.p`
  color: rgb(108, 121, 143);
  font-size: 12px;
`

const IssueCreateAssigneeField = ({ assigneeId, handleSelectMenu, membersList }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(membersList)
  const currentMember = membersList.find(member => member._id === assigneeId);
  return (
    <SectionContainer>
      <SectionTitle>Assignee</SectionTitle>
      <SectionContent onClick={() => setIsMenuOpen(true)}>
        <SelectItem>
          {
            currentMember !== undefined ? (
              <Fragment>
                <Icon type="user-icon" imageUrl={currentMember.pictureUrl} size={20} top={1} />
                {currentMember.name}
              </Fragment>) : (
                <UnassignedText>Unassigned</UnassignedText>
              )
          }
        </SelectItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </SectionContent>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => handleSelectMenu('assigneeId', option.value._id)}
        options={membersList.filter(member => member._id !== assigneeId).map(member => ({
          key: member._id,
          value: member,
        }))}
        renderValue={({ value: member }) => renderOption(member)}
      />
    </SectionContainer>
  )
}

const renderOption = (member) => {
  return (
    <SelectItem>
      <Icon type="user-icon" imageUrl={member.pictureUrl} size={20} top={1} />
      {member.name}
    </SelectItem>
  )
}

IssueCreateAssigneeField.propTypes = {
  assigneeId: PropTypes.string.isRequired,
  membersList: PropTypes.array.isRequired,
  handleSelectMenu: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  membersList: selectMembers,
});

export default connect(mapStateToProps, null)(IssueCreateAssigneeField);

