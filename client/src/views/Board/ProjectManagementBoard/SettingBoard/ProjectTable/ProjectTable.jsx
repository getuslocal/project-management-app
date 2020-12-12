import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Table from '../../../../../shared/components/Table/Table'
import Icon from '../../../../../shared/components/Icon/Icon';
import SelectButton from '../SelectButton/SelectButton';
import ConfirmationModal from '../../../../../shared/components/Modal/ConfirmationModal/ConfirmationModal';
import {
  NameCell,
  NoProjectsContent
} from './ProjectTable.style';
import store from '../../../../../redux/store';
import { deleteProject } from '../../../../../redux/projects/projects.actions';

const ProjectTable = ({
  projectList,
  memberList,
  searchFilter,
}) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  if (Object.keys(projectList).length === 0) {
    return (
      <NoProjectsContent>
        <p>No projects created</p>
      </NoProjectsContent>
    )
  }

  return (
    <Fragment>

      <Table>
        <Table.Head>
          <tr>
            <th width="75px"></th>
            <th width="150px">Key</th>
            <th width="">Name</th>
            <th width="150px">Type</th>
            <th width="300px">Members</th>
          </tr>
        </Table.Head>
        <Table.Body>
          {
            Object.values(projectList).map(project => {
              const isMatchedWithFilter = project.name.toLowerCase().includes(searchFilter.toLowerCase())
              return (
                isMatchedWithFilter && (
                  <tr key={project._id}>
                    <td>
                      <SelectButton projectId={project._id} setIsConfirmationModalOpen={setIsConfirmationModalOpen} setDeleteProjectId={setDeleteProjectId} />
                    </td>
                    <td>{project.key}</td>
                    <NameCell >
                      <Icon className="project-icon" type="project-icon" imageUrl={project.projectIconUrl} size={28} />
                      <Link to={`/app/projects/${project._id}`} >{project.name}</Link>
                    </NameCell>
                    <td>{project.category}</td>
                    <td>
                      {
                        project.members.map(memberId => {
                          const memberData = memberList.find(member => member._id === memberId);
                          return (
                            memberData &&
                            <Icon key={memberData._id} type="user-icon" imageUrl={memberData.pictureUrl} size={30} style={{ marginRight: '3px' }} />
                          )
                        })
                      }
                    </td>
                  </tr>
                )
              )
            })
          }
        </Table.Body>
      </Table>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          title="Are you sure you want to delete this project ?"
          onClick={() => {
            store.dispatch(deleteProject(deleteProjectId));
            setIsConfirmationModalOpen(false);
          }}
          closeModal={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </Fragment>
  )
}

export default ProjectTable;
