import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { IssueTypes } from '../../../../../../shared/constants/issues';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  SelectItem,
  AngleDownIcon,
  Description,
} from '../IssueCreate.style';

function IssueCreateTypeField({ issueType, handleSelectMenu, isEpic }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isEpic) {
    return (
      <SectionContainer>
        <SectionTitle>Issue type*</SectionTitle>
        <SectionContent>
          <SelectItem>
            <Icon type={issueType.toLowerCase()} size={13} />
            {issueType}
          </SelectItem>
        </SectionContent>
        <Description>
          Some issue types are unavailable due to incompatible field
          configuration and/or workflow associations.
        </Description>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>Issue type*</SectionTitle>
      <SectionContent onClick={() => setIsMenuOpen(true)}>
        <SelectItem>
          <Icon type={issueType.toLowerCase()} size={13} />
          {issueType}
        </SelectItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </SectionContent>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => handleSelectMenu('issueType', option.value)}
        options={Object.values(IssueTypes)
          .filter((type) => type !== issueType && type != IssueTypes.EPIC)
          .map((option) => ({
            key: option,
            value: option,
          }))}
        renderValue={({ value: issueType }) => renderOption(issueType)}
      />
      <Description>
        Some issue types are unavailable due to incompatible field configuration
        and/or workflow associations.
      </Description>
    </SectionContainer>
  );
}

const renderOption = (issueType) => {
  return (
    <SelectItem>
      <Icon type={issueType.toLowerCase()} size={13} />
      {issueType}
    </SelectItem>
  );
};

IssueCreateTypeField.propTypes = {
  issueType: PropTypes.string.isRequired,
  handleSelectMenu: PropTypes.func.isRequired,
};

export default IssueCreateTypeField;
