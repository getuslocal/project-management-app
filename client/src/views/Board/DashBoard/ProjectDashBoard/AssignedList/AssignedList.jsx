import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import Icon from '../../../../../shared/components/Icon/Icon';
import { IssueTypes } from '../../../../../shared/constants/issues';
import {
  Container,
  Table,
  Head,
  Body,
  TableHeader,
  TableData,
  BodyTableRow,
} from './AssignedList.style';

export const AssignedList = ({
  projectId,
  tickets,
  currentUser,
  projectKey,
  ...props
}) => {
  const assignedTickets = tickets.filter(
    (ticket) => ticket.assigneeId === currentUser._id
  );
  return (
    <Container>
      <Table>
        <Head>
          <tr>
            <TableHeader width="30">T</TableHeader>
            <TableHeader width="120">Key</TableHeader>
            <TableHeader width="">Summary</TableHeader>
            <TableHeader width="30">P</TableHeader>
          </tr>
        </Head>
        <Body>
          {assignedTickets.length > 0 ? (
            assignedTickets.map((ticket) => {
              const isEpic = ticket.issueType === IssueTypes.EPIC;
              return (
                <BodyTableRow
                  key={ticket._id}
                  onClick={() => {
                    if (isEpic) {
                      props.history.push(
                        `/app/projects/${projectId}/roadmap?selectedIssue=${ticket.key}`
                      );
                    } else {
                      props.history.push(
                        `/app/projects/${projectId}/?selectedIssue=${ticket.key}`
                      );
                    }
                  }}
                >
                  <TableData width="30">
                    <Icon
                      type={ticket.issueType.toLowerCase()}
                      size={13}
                      top={-2}
                    />
                  </TableData>
                  <TableData
                    width="120"
                    style={{ color: '#5e6c84', fontWeight: 500 }}
                  >
                    {projectKey}-{ticket.key}
                  </TableData>
                  <TableData width="">{ticket.summary}</TableData>
                  <TableData width="30">
                    <Icon
                      type={`priority-${ticket.issuePriority.toLowerCase()}`}
                      isSolid={true}
                      size={13}
                    />
                  </TableData>
                </BodyTableRow>
              );
            })
          ) : (
            <BodyTableRow className="no-results-row">
              <TableData>No issues assigned to you.</TableData>
            </BodyTableRow>
          )}
        </Body>
      </Table>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(AssignedList);
