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
  SelectItem,
  SectionContent,
  AngleDownIcon,
  UnassignText
} from './Owner.style';

function Owner({ owner, onChange, members }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentOwner = members.find(member => member._id === owner);
  return (
    <SectionContainer>
      <SectionTitle>Project Lead</SectionTitle>
      <SectionContent onClick={() => setIsMenuOpen(true)}>
        <SelectItem>
          {
            currentOwner ?
              <Fragment>
                <Icon type="user-icon" imageUrl={currentOwner && currentOwner.pictureUrl} size={22} top={2} />
                {currentOwner && currentOwner.name}
              </Fragment>
              :
              <UnassignText>Unassigned</UnassignText>
          }
        </SelectItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </SectionContent>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => onChange(option.value)}
        options={members.filter(member => member._id !== currentOwner._id).map(option => ({
          key: option._id,
          value: option._id,
        }))}
        renderValue={({ value: ownerId }) => renderUser(ownerId, members)}
      />
    </SectionContainer>
  )
}

const renderUser = (ownerId, members) => {
  const member = members.find(member => member._id === ownerId)
  return (
    <SelectItem>
      <Icon type="user-icon" imageUrl={member && member.pictureUrl} size={22} top={2} />
      {member.name}
    </SelectItem>
  )
}

Owner.propTypes = {
  members: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  members: selectMembers,
});

export default connect(mapStateToProps, null)(Owner)

