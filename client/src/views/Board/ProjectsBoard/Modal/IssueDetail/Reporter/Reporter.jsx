import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
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

function Reporter({ value, updateTicketField, members }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const member = members.find(member => member._id === value)
  return (
    <SectionContainer>
      <SectionTitle>Reporter</SectionTitle>
      <SectionContent className="icon-angle-down" onClick={() => setIsMenuOpen(true)}>
        <IconCont>
          <Icon type="user-icon" imageUrl={member && member.pictureUrl} size={30} top={2} />
        </IconCont>
        {member && member.name}
      </SectionContent>
      <SelectMenu
        name="reporterId"
        value={value}
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => updateTicketField({ reporterId: option.value })}
        options={members.filter(member => member._id !== value).map(option => ({
          key: option._id,
          value: option._id,
        }))}
        renderValue={({ value: reporterId }) => renderUser(reporterId, members)}
      />
    </SectionContainer>
  )
}

const renderUser = (reporterId, members) => {
  const member = members.find(member => member._id === reporterId)
  return (
    <Fragment>
      <IconCont>
        <Icon type="user-icon" imageUrl={member && member.pictureUrl} size={30} top={2} />
      </IconCont>
      {member && member.name}
    </Fragment>
  )
}

Reporter.propTypes = {
  value: PropTypes.string,
  updateTicketField: PropTypes.func.isRequired,
  members: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  members: selectMembers,
});

export default connect(mapStateToProps, null)(Reporter)

