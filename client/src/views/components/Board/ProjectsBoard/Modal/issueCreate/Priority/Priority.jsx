import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import { IssuePriorities } from '../../../../../../../shared/constants/issues';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  SelectItem,
  AngleDownIcon,
  Description
} from '../IssueCreate.style';

function IssueCreateTypeField({ issuePriority, handleSelectMenu }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <SectionContainer>
      <SectionTitle>Priority</SectionTitle>
      <SectionContent onClick={() => setIsMenuOpen(true)}>
        <SelectItem>
          <Icon type={`priority-${issuePriority.toLowerCase()}`} isSolid={true} size={13} />
          {issuePriority}
        </SelectItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </SectionContent>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => handleSelectMenu('issuePriority', option.value)}
        options={Object.values(IssuePriorities).filter(priority => priority !== issuePriority).map(option => ({
          key: option,
          value: option,
        }))}
        renderValue={({ value: priority }) => renderOption(priority)}
      />
      <Description>Priority in relation to other issues.</Description>
    </SectionContainer>
  )
}

const renderOption = (priority) => {
  return (
    <SelectItem>
      <Icon type={`priority-${priority.toLowerCase()}`} isSolid={true} size={13} />
      {priority}
    </SelectItem>
  )
}

IssueCreateTypeField.propTypes = {
  issuePriority: PropTypes.string.isRequired,
  handleSelectMenu: PropTypes.func.isRequired,
}


export default IssueCreateTypeField;

