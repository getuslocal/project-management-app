import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect'
import { selectProjectHistory } from '../../../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import { IssueHistoryTypes, IssueTypes } from '../../../../../shared/constants/issues';
import { Link } from 'react-router-dom';
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
  TicketName,
  Left,
  Right,
  CircleMark,
  NoResultText
} from './IssueHistory.style';

export const IssueHistory = ({ projectId, historyList, members, tickets }) => {
  return (
    <Fragment>
      <Container>
        {historyList.length > 0 ? (
          <ListContainer>
            {
              historyList.map(history => {
                const { editor, field, ticket, before, after, date, type } = history;
                const editorData = members.find(member => member._id === editor);
                return (
                  <List key={history._id}>
                    <Left>
                      <Date>{moment(date).fromNow()}</Date>
                      <CircleMark />
                    </Left>
                    <Right>
                      <IconCont>
                        <Icon type="user-icon" imageUrl={editorData && editorData.pictureUrl} size={30} top={2} />
                      </IconCont>
                      <MainContent>
                        <EditorName>{editorData && editorData.name}</EditorName>
                        {type === IssueHistoryTypes.UPDATE && (
                          <span> updated <Bold>{field && field}</Bold>
                            {before && <Fragment>{' '}from{' '}<Bold>{before}</Bold></Fragment>}
                            {after && <Fragment>{' '}to{' '}<Bold>{after}</Bold></Fragment>}
                            {' '}on
                          </span>
                        )}
                        {type === IssueHistoryTypes.CREATE && `created an ${ticket.type !== IssueTypes.EPIC ? 'issue' : 'epic'}:`}
                        {type === IssueHistoryTypes.DELETE && `deleted an ${ticket.type !== IssueTypes.EPIC ? 'issue' : 'epic'}:`}
                        {type === IssueHistoryTypes.COMMENT && "commented on"}
                        <TicketName>
                          <Icon type={ticket.type.toLowerCase()} isSolid={true} size={13.5} top={-1} />
                          {/* @TODO: Ennable ticket link after fixing ticket key issue. */}
                          {/* <Link to={`/app/projects/${projectId}/?selectedIssue=${'DEMO3-174'}`}>{ticket.displayValue}</Link> */}
                          {ticket.displayValue}
                        </TicketName>
                      </MainContent>
                    </Right>
                  </List>
                )
              })
            }
          </ListContainer>
        ) : (
            <NoResultText>This project has no history.</NoResultText>
          )
        }
      </Container>
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
