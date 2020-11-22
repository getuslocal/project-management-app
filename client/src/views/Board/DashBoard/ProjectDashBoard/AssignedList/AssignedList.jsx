import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import Icon from '../../../../../shared/components/Icon/Icon';
import {
  Container,
  Table,
  Head,
  Body,
  TableHeader,
  TableData,
  BodyTableRow,
} from './AssignedList.style';

export const AssignedList = ({ projectId, tickets, currentUser, ...props }) => {
  const assignedTickets = tickets.filter(ticket => ticket.assigneeId === currentUser._id);
  return (
    <Container>
      <Table>
        <Head>
          <tr>
            <TableHeader width="30px">T</TableHeader>
            <TableHeader width="120px">Key</TableHeader>
            <TableHeader width="">Summary</TableHeader>
            <TableHeader width="30px">P</TableHeader>
          </tr>
        </Head>
        <Body>
          {
            assignedTickets.length > 0 ? (
              assignedTickets.map(ticket => {
                return (
                  <BodyTableRow key={ticket._id} onClick={() => props.history.push(`/app/projects/${projectId}/?selectedIssue=${ticket.key}`)}>
                    <TableData width="30px"><Icon type={ticket.issueType.toLowerCase()} size={13} top={-2} /></TableData>
                    <TableData width="120px" style={{ color: '#5e6c84', fontWeight: 500 }}>{ticket.key}</TableData>
                    <TableData width="">{ticket.summary}</TableData>
                    <TableData width="30px"><Icon type={`priority-${ticket.issuePriority.toLowerCase()}`} isSolid={true} size={13} /></TableData>
                  </BodyTableRow>
                )
              })
            ) : (
                <BodyTableRow className="no-results-row">
                  <TableData>
                    No issues assigned to you.
                </TableData>
                </BodyTableRow>
              )
          }
        </Body>
      </Table>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
})

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(AssignedList)
