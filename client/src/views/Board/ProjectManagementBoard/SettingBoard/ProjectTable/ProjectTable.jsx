import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import Table from '../../../../../shared/components/Table/Table'
import Icon from '../../../../../shared/components/Icon/Icon';
import SelectButton from '../SelectButton/SelectButton';
import {
  NameCell,
  NoProjectsContent
} from './ProjectTable.style';

const ProjectTable = ({ projectList, memberList, searchFilter }) => {

  if(Object.keys(projectList).length === 0) {
    return (
      <NoProjectsContent>
        <p>No projects created</p>
      </NoProjectsContent>
    )
  }

  return (
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
                    <SelectButton projectId={project._id} />
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
  )
}

ProjectTable.propTypes = {
  projectList: PropTypes.object.isRequired,
  memberList: PropTypes.array.isRequired,
}

const mapStateToProps = createStructuredSelector({
  projectList: selectProjects,
  memberList: selectMembers,
});

export default connect(mapStateToProps, null)(ProjectTable);
