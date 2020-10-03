import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  SelectItem,
  AngleDownIcon
} from '../IssueCreate.style';

function IssueCreateProjectField({ currentProject, projects, handleSelectMenu }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <SectionContainer>
      <SectionTitle>Project*</SectionTitle>
      <SectionContent onClick={() => setIsMenuOpen(true)}>
        <SelectItem>
          <Icon type="project-icon" imageUrl={currentProject.projectIconUrl} size={20} top={1}/>
          {currentProject.name}
        </SelectItem>
        <AngleDownIcon>
          <Icon type="angle-down" isSolid={true} size={14} />
        </AngleDownIcon>
      </SectionContent>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => handleSelectMenu('projectId', option.value._id)}
        options={Object.values(projects).filter(project => project._id !== currentProject._id).map(project => ({
          key: project._id,
          value: project,
        }))}
        renderValue={({ value: project }) => renderOption(project)}
      />
    </SectionContainer>
  )
}

const renderOption = (project) => {
  return (
    <SelectItem>
      <Icon type="project-icon" imageUrl={project.projectIconUrl} size={20} top={1}/>
      {project.name}
    </SelectItem>
  )
}

IssueCreateProjectField.propTypes = {
  currentProject: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  handleSelectMenu: PropTypes.func.isRequired,
}


export default IssueCreateProjectField;

