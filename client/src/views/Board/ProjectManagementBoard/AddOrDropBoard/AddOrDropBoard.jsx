import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../../shared/components/Icon/Icon';
import Button from '../../../../shared/components/Button/Button';
import NewProjectModal from './NewProjectModal/NewProjectModal';
import EditProjectModal from './EditProjectModal/EditProjectModal';
import { deleteProject } from '../../../../redux/projects/projects.actions';
import { color } from '../../../../shared/utils/styles'
import store from '../../../../redux/store'
import {
  Container,
  Top,
  Title,
  Table,
  TableHeader,
  TableData,
  BodyRow,
} from './AddOrDropBoard.style';

const AddOrDropBoard = ({ projectList, memberList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  console.log(memberList)
  return (
    <Fragment>
      <Container>
        <Top>
          <Title>All Projects</Title>
          <Button text="Create project" variant="primary" onClick={() => setIsModalOpen(true)} />
        </Top>
        <Table>
          <thead>
            <tr>
              <TableHeader width="150px">Key</TableHeader>
              <TableHeader width="">Name</TableHeader>
              <TableHeader width="200px">Type</TableHeader>
              <TableHeader width="250px">Lead</TableHeader>
              <TableHeader width="300px">Members</TableHeader>
              <TableHeader width="75px"></TableHeader>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(projectList).map(project => {
                const projectLead = memberList.find(member => member._id === project.owner);
                return (
                  <BodyRow key={project._id}>
                    <TableData>{project.key}</TableData>
                    <TableData >
                      <Icon className="project-icon" type="project-icon" imageUrl={project.projectIconUrl} size={28} />
                      <span className="project-name">{project.name}</span>
                    </TableData>
                    <TableData>{project.category}</TableData>
                    <TableData>
                      <Icon className="user-icon" type="user-icon" imageUrl={projectLead && projectLead.pictureUrl} size={30} />
                      {projectLead && projectLead.name}
                    </TableData>
                    <TableData>
                      {
                        memberList.map(member =>
                          <Icon type="user-icon" imageUrl={member.pictureUrl} size={30} style={{ marginRight: '3px' }} />
                        )
                      }
                    </TableData>
                    <TableData>
                      {/* <Icon onClick={() => store.dispatch(deleteProject(project._id))} className="trash-icon" type="trash" size={16} /> */}
                      <Button text="Edit" 
                        style={{ backgroundColor: color.backgroundLight, color: color.textDark, float: 'right' }} 
                        onClick={() => setIsEditModalOpen(project)} />
                    </TableData>
                  </BodyRow>
                )
              })
            }
          </tbody>
        </Table>
      </Container>
      {isModalOpen && <NewProjectModal setIsModalOpen={setIsModalOpen} />}
      {isEditModalOpen && <EditProjectModal project={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />}
    </Fragment>
  )
}

AddOrDropBoard.propTypes = {

}

export default AddOrDropBoard