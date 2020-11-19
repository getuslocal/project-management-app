import React from 'react'
import PropTypes from 'prop-types'
import { color } from '../../../../../shared/utils/styles'
import Icon from '../../../../../shared/components/Icon/Icon';
import moment from 'moment'
import {
  Container,
  Table,
  Head,
  Body,
  TableHeader,
  TableData,
  BodyTableRow,
  FlexContainer,
} from './MembersList.style';

export const MembersList = ({ members, projects }) => {

  const getProjectLabels = (member) => {
    const assignedProjects = Object.values(projects).filter(project => project.members.includes(member));
    const labels = assignedProjects.length > 0 ? assignedProjects.map(project => project.name) : [];
    return labels.join(', ');
  }

  return (
    <Container>
      <Table>
        <Head>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Position</TableHeader>
            <TableHeader>Projects</TableHeader>
            <TableHeader>Member Since</TableHeader>
          </tr>
        </Head>
        <Body>
          {
            members.map(member => {
              return (
                <BodyTableRow key={member._id}>
                  <TableData >
                    <FlexContainer>
                      <Icon type="user-icon" imageUrl={member.pictureUrl} size={30} top={1} />
                      <span style={{ color: color.black }}>{member.name}</span>
                    </FlexContainer>
                  </TableData>
                  <TableData>{member.position}</TableData>
                  <TableData>{getProjectLabels(member._id)}</TableData>
                  <TableData>
                    <Icon type="calendar" size={16} top={1} />
                    {moment(member.createdAt).format('MMM DD, YYYY')}
                  </TableData>
                </BodyTableRow>
              )
            })
          }
        </Body>
      </Table>
    </Container>
  )
}

MembersList.propTypes = {
  projects: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
}

export default MembersList;
