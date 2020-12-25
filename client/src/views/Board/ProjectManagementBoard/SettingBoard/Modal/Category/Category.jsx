import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { projectCategories } from '../../../../../../shared/constants/projects';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  SelectItem,
  AngleDownIcon,
} from './Category.style';

function IssueCreateTypeField({ currentCategory, onChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <SectionContainer>
      <SectionTitle>Category</SectionTitle>
      <SectionContent onClick={() => setIsMenuOpen(true)}>
        <SelectItem>
          {currentCategory ? (
            currentCategory
          ) : (
            <span className="placeholder">Choose a category</span>
          )}
        </SelectItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </SectionContent>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => onChange(option.value)}
        options={Object.values(projectCategories)
          .filter((category) => category !== currentCategory)
          .map((option) => ({
            key: option,
            value: option,
          }))}
        renderValue={({ value: priority }) => renderOption(priority)}
      />
    </SectionContainer>
  );
}

const renderOption = (priority) => {
  return <SelectItem>{priority}</SelectItem>;
};

IssueCreateTypeField.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default IssueCreateTypeField;
