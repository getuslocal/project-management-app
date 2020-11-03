import React, { Fragment, useState } from 'react'
import Button from '../../../../shared/components/Button/Button';
import NewProjectModal from './Modal/NewProjectModal/NewProjectModal';
import SearchBox from '../../../../shared/components/SearchBox/SearchBox';
import ProjectTable from './ProjectTable/ProjectTable';
import { Margin } from '../../../../shared/utils/global';
import {
  Container,
  Top,
  Title,
} from './SettingBoard.style';

const ProjectSettingBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  return (
    <Fragment>
      <Container>
        <Top>
          <Title>All Projects</Title>
          <Button text="Create project" variant="primary" onClick={() => setIsModalOpen(true)} />
        </Top>
        <Margin bottom={20} >
          <SearchBox placeholder="Filter projects" width={220} onChange={e => setSearchFilter(e.target.value)} />
        </Margin>
        <ProjectTable searchFilter={searchFilter} />
      </Container>
      {isModalOpen && <NewProjectModal setIsModalOpen={setIsModalOpen} />}
    </Fragment>
  )
}

export default ProjectSettingBoard;