import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getMembersOfOrganization } from '../../../../redux/members/members.actions';
import { selectProjects } from '../../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../../redux/members/members.selectors';
import { selectOrganization } from '../../../../redux/organizations/organizations.selectors';
import Icon from '../../../../shared/components/Icon/Icon';
import Button from '../../../../shared/components/Button/Button';
import SelectButton from './SelectButton/SelectButton';
import NewProjectModal from './Modal/NewProjectModal/NewProjectModal';
import {
  Container,
  Top,
  Title,
  Table,
  TableHeader,
  TableData,
  BodyRow,
} from './SettingBoard.style';

const ProjectSettingBoard = ({
  projectList,
  memberList,
  organization,
  getMembersOfOrganization,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getMembersOfOrganization(organization._id);
  }, [])

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
              <TableHeader width="75px"></TableHeader>
              <TableHeader width="150px">Key</TableHeader>
              <TableHeader width="">Name</TableHeader>
              <TableHeader width="150px">Type</TableHeader>
              <TableHeader width="300px">Members</TableHeader>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(projectList).map(project => {
                const projectLead = memberList.find(member => member._id === project.owner);
                return (
                  <BodyRow key={project._id}>
                    <TableData>
                      <SelectButton
                        projectId={project._id}
                      />
                    </TableData>
                    <TableData>{project.key}</TableData>
                    <TableData >
                      <Icon className="project-icon" type="project-icon" imageUrl={project.projectIconUrl} size={28} />
                      <span className="project-name">{project.name}</span>
                    </TableData>
                    <TableData>{project.category}</TableData>
                    <TableData>
                      {
                        project.members.map(memberId => {
                          const memberData = memberList.find(member => member._id === memberId);
                          return (
                            memberData &&
                            <Icon key={memberData._id} type="user-icon" imageUrl={memberData.pictureUrl} size={30} style={{ marginRight: '3px' }} />
                          )
                        })
                      }
                    </TableData>
                  </BodyRow>
                )
              })
            }
          </tbody>
        </Table>
      </Container>
      {isModalOpen && <NewProjectModal setIsModalOpen={setIsModalOpen} />}
    </Fragment>
  )
}

ProjectSettingBoard.propTypes = {
  organization: PropTypes.object.isRequired,
  projectList: PropTypes.object.isRequired,
  memberList: PropTypes.array.isRequired,
}

const mapStateToProps = createStructuredSelector({
  organization: selectOrganization,
  projectList: selectProjects,
  memberList: selectMembers,
});

export default connect(mapStateToProps, { getMembersOfOrganization })(ProjectSettingBoard);