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

export const MembersList = ({ members }) => (
  <Container>
    <Table>
      <Head>
        <tr>
          <TableHeader>Name</TableHeader>
          <TableHeader>Position</TableHeader>
          <TableHeader>Role</TableHeader>
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
                <TableData>{member.role}</TableData>
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
);

MembersList.propTypes = {
  projects: PropTypes.object,
  members: PropTypes.array.isRequired,
}

export default MembersList;
