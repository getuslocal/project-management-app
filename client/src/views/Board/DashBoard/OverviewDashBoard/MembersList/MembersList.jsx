import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectMembers } from '../../../../../redux/members/members.selectors';
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
  Count
} from './MembersList.style';

export const MembersList = ({ members }) => {
  return (
    <Container>
      <Table>
        <Head>
          <tr>
            <TableHeader width="">Name</TableHeader>
            <TableHeader width="">Position</TableHeader>
            <TableHeader width="">Team</TableHeader>
            <TableHeader width="">Assigned Issues</TableHeader>
            <TableHeader width="">Member Since</TableHeader>
          </tr>
        </Head>
        <Body>
          {
            members.map(member => {
              return (
                <BodyTableRow key={member._id}>
                  <TableData width="" >
                    <FlexContainer>
                      <Icon type="user-icon" imageUrl={member.pictureUrl} size={30} top={1} />
                      <span style={{ color: color.black }}>{member.name}</span>
                    </FlexContainer>
                  </TableData>
                  <TableData width="">{member.position}</TableData>
                  <TableData width="">CoinX</TableData>
                  <TableData width="">
                    <span style={{ fontWeight: 700, }}>16</span> issues left</TableData>
                  <TableData width="">
                    <Icon type="calendar" size={16} top={1} />
                    {moment(member.createdAt).format('MMM DD, YYYY')}
                  </TableData>
                </BodyTableRow>
              )
            })
          }
        </Body>
      </Table>
        <Count>Show all {members.length} members</Count>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  members: selectMembers
})

export default connect(mapStateToProps, null)(MembersList)
