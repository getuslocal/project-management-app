import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectTickets } from '../../../../redux/tickets/tickets.selectors';
import Icon from '../../../../shared/components/Icon/Icon';
import {
  Container,
  Table,
  Head,
  Body,
  TableHeader,
  TableData,
  BodyTableRow,
  ResultCounter
} from './TicketHistory.style';

export const AssignedList = ({ tickets }) => {
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
            tickets.map(ticket => {
              return (
                <BodyTableRow key={ticket._id}>
                  <TableData width="30px" ><Icon type={ticket.issueType.toLowerCase()} size={13} top={-2} /></TableData>
                  <TableData width="120px" style={{ color: '#5e6c84', fontWeight: 500, fontSize: '14px' }}>{ticket.key}</TableData>
                  <TableData width="">{ticket.summary}</TableData>
                  <TableData width="30px"><Icon type={`priority-${ticket.issuePriority.toLowerCase()}`} isSolid={true} size={13} /></TableData>
                </BodyTableRow>
              )
            })
          }
        </Body>
      </Table>
        <ResultCounter>Display {tickets.length} results</ResultCounter>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  tickets: selectTickets
})

export default connect(mapStateToProps, null)(AssignedList)
