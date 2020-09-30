import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import { selectMembers } from '../../../../../../../redux/members/members.selectors';
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

function Assignee({ value, updateTicketField, members }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const member = members.find(member => member._id === value)
  return (
    <SectionContainer>
      <SectionTitle>Assignee</SectionTitle>
      <SectionContent className="icon-angle-down" onClick={() => setIsMenuOpen(true)}>
        {
          value ?
            <Fragment>
              <IconCont>
                <Icon type="user-icon" imageUrl={member && member.pictureUrl} size={30} top={2} />
              </IconCont>
              {member && member.name}
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
        onChange={(option) => updateTicketField({ assigneeId: option.value })}
        options={members.filter(member => member._id !== value).map(option => ({
          value: option._id,
        }))}
        renderValue={({ value: assigneeId }) => renderUser(assigneeId, members)}
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

