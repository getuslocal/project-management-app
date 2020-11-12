import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect'
import { selectProjectHistory } from '../../../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import Icon from '../../../../../shared/components/Icon/Icon';
import moment from 'moment'
import {
  Container,
  ListContainer,
  List,
  IconCont,
  MainContent,
  EditorName,
  Bold,
  Date,
  Top,
  Bottom,
  Comment,
  Left,
  Right,
  CircleMark,
  Result
} from './IssueHistory.style';

/*
Logs : {
  ticketId: ""
  type: "New"/"Update"
  editor: ""
  field: "Status"/"Summary"/"Description"/"Ticket"
  before: "TODO"
  after: "IN REVIEW"
  timestamp
}

User Pic: WHO updates [FIELD] [from PREV] [to CHANGE] on TICKET
          [TEXT] -> may implement later
          WHEN
User Pic: WHO created TICKET.
          WHEN
User Pic: WHO commented on TICKET.
          [TEXT]
          WHEN
User Pic: WHO mark complete on TICKET.
          [TEXT]
          WHEN
TICKET: New Ticket/Summary/Description is created by WHO, WHEN
s*/

export const IssueHistory = ({ historyList, members, tickets }) => {
  return (
    <Fragment>
      <Container>
        <ListContainer>
          {historyList.map(history => {
            const { editor, field, ticketId, before, after, date, type } = history;
            const editorData = members.find(member => member._id === editor);
            const ticket = tickets.find(ticket => ticket._id === ticketId)
            return (
              <List key={history._id}>
                <Left>
                  <Date>{moment(date).fromNow()}</Date>
                  <CircleMark />
                </Left>
                <Right>
                  <IconCont>
                    <Icon type="user-icon" imageUrl={editorData && editorData.pictureUrl} size={30} />
                  </IconCont>
                  <MainContent>
                    <Top>
                      <EditorName>{editorData && editorData.name}</EditorName>
                      {type === "Update" &&
                        <span> updated <Bold>{field && field}</Bold>
                          {before && (
                            <Fragment>
                              {' '}from{' '}
                              <Bold>{before}</Bold>
                            </Fragment>
                          )}
                          {after && (
                            <Fragment>
                              {' '}to{' '}
                              <Bold>{after}</Bold>
                            </Fragment>
                          )}
                        </span>
                      }
                      {type === "New" &&
                        <span> created a new ticket </span>
                      }
                      {type === "Complete" &&
                        <span> maked complete on </span>
                      }
                      {type === "Comment" &&
                        <span> commented on </span>
                      }
                    </Top>
                    <Bottom>
                      <Icon type={ticket && ticket.issueType.toLowerCase()} isSolid={true} size={12} top={-1} />
                      <Comment>{ticket && ticket.key} - {ticket && ticket.summary}</Comment>
                    </Bottom>
                  </MainContent>
                </Right>
              </List>
            )
          })}
        </ListContainer>
      </Container>
      <Result>
        Display the latest 20 updates
      </Result>
    </Fragment>
  )
}

IssueHistory.propTypes = {
  historyList: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
};

const mapStateToProps = (stae, ownProps) => createStructuredSelector({
  historyList: selectProjectHistory(ownProps.projectId),
  members: selectMembers,
})

export default connect(mapStateToProps, null)(IssueHistory)
