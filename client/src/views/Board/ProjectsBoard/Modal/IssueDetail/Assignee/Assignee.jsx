import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { selectMembers } from '../../../../../../redux/members/members.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  IconCont
} from '../IssueDetail.style';

const UnassignText = styled.p`
  color: rgb(137, 147, 164);
  font-size: 14px;
`
function Assignee({ value, updateTicketField, members, updateTicketHistory }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentMember = members.find(member => member._id === value);
  return (
    <SectionContainer>
      <SectionTitle>Assignee</SectionTitle>
      <SectionContent className="icon-angle-down" onClick={() => setIsMenuOpen(true)}>
        {
          value ?
            <Fragment>
              <IconCont>
                <Icon type="user-icon" imageUrl={currentMember && currentMember.pictureUrl} size={30} top={2} />
              </IconCont>
              {currentMember && currentMember.name}
            </Fragment>
            :
            <Fragment>
              <UnassignText>Unassigned</UnassignText>
            </Fragment>
        }
      </SectionContent>
      <SelectMenu
        value={value}
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={({ value: member }) => {
          updateTicketField({ field: 'assigneeId', value: member._id });
          const prevMember =  currentMember ? currentMember.name : 'Unassigned';
          updateTicketHistory('Assignee', prevMember, member.name);
        }}
        options={members.filter(member => member._id !== value).map(member => ({
          key: member._id,
          value: member,
        }))}
        renderValue={({ value: member }) => renderUser(member._id, members)}
      />
    </SectionContainer>
  )
}

const renderUser = (assigneeId, members) => {
  const member = members.find(member => member._id === assigneeId)
  return (
    <Fragment>
      <IconCont>
        <Icon type="user-icon" imageUrl={member && member.pictureUrl} size={30} top={2} />
      </IconCont>
      {member.name}
    </Fragment>
  )
}

Assignee.propTypes = {
  value: PropTypes.string,
  updateTicketField: PropTypes.func.isRequired,
  members: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
  members: selectMembers,
});

export default connect(mapStateToProps, null)(Assignee)

