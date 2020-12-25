import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { IssueColors } from '../../../../../../shared/constants/issues';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  SelectItem,
  AngleDownIcon,
} from '../IssueCreate.style';

const IssueCreateColorsField = ({ issueColor, setIssueColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const thisColor = Object.values(IssueColors).find(
    (color) => color.name === issueColor
  );
  return (
    <SectionContainer>
      <SectionTitle>Issue color</SectionTitle>
      <SectionContent onClick={() => setIsMenuOpen(true)}>
        <SelectItem>
          <Icon
            type={`issue-${thisColor.name.toLowerCase()}`}
            size={12}
            top={1}
          />
          {thisColor.name}
        </SelectItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </SectionContent>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => setIssueColor(option.value)}
        options={Object.values(IssueColors)
          .filter((color) => color.name !== issueColor)
          .map((color) => ({
            key: color.name,
            value: color.name,
          }))}
        renderValue={({ value: color }) => renderOption(color)}
      />
    </SectionContainer>
  );
};

const renderOption = (colorName) => {
  return (
    <SelectItem>
      <Icon type={`issue-${colorName.toLowerCase()}`} size={12} top={1} />
      {colorName}
    </SelectItem>
  );
};

IssueCreateColorsField.propTypes = {
  issueColor: PropTypes.string.isRequired,
  setIssueColor: PropTypes.func.isRequired,
};

export default IssueCreateColorsField;
