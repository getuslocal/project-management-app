import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectProjectHistory } from '../../../../../redux/projects/projects.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import {
  IssueHistoryTypes,
  IssueTypes,
} from '../../../../../shared/constants/issues';
import { Link } from 'react-router-dom';
import Icon from '../../../../../shared/components/Icon/Icon';
import moment from 'moment';
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
  NoResultText,
} from './IssueHistory.style';

export const IssueHistory = ({
  project: { _id: projectId, history, key },
  members,
  tickets,
}) => {
  return (
    <Fragment>
      <Container>
        {history.length > 0 ? (
          <ListContainer>
            {history.map((historyData) => {
              const {
                editor,
                field,
                ticket,
                before,
                after,
                date,
                type,
              } = historyData;
              const editorData = members.find(
                (member) => member._id === editor
              );
              const ticketData = tickets.find(
                (ticketData) => ticketData._id === ticket.id
              );

              return (
                <List key={historyData._id}>
                  <Left>
                    <Date>{moment(date).fromNow()}</Date>
                    <CircleMark />
                  </Left>
                  <Right>
                    <IconCont>
                      <Icon
                        type="user-icon"
                        imageUrl={editorData && editorData.pictureUrl}
                        size={30}
                        top={2}
                      />
                    </IconCont>
                    <MainContent>
                      <EditorName>{editorData && editorData.name}</EditorName>
                      {type === IssueHistoryTypes.UPDATE && (
                        <span>
                          updated <Bold>{field && field}</Bold>
                          {before && (
                            <Fragment>
                              {' '}
                              from <Bold>{before}</Bold>
                            </Fragment>
                          )}
                          {after && (
                            <Fragment>
                              {' '}
                              to <Bold>{after}</Bold>
                            </Fragment>
                          )}{' '}
                          on
                        </span>
                      )}
                      {type === IssueHistoryTypes.CREATE &&
                        `created an ${
                          ticket.type !== IssueTypes.EPIC ? 'issue' : 'epic'
                        }:`}
                      {type === IssueHistoryTypes.DELETE &&
                        `deleted an ${
                          ticket.type !== IssueTypes.EPIC ? 'issue' : 'epic'
                        }:`}
                      {type === IssueHistoryTypes.COMMENT && 'commented on'}
                      <TicketName>
                        <Icon
                          type={ticket.type.toLowerCase()}
                          isSolid={true}
                          size={13.5}
                          top={-1}
                        />
                        {ticketData ? (
                          ticketData.issueType === IssueTypes.EPIC ? (
                            <Link
                              to={`/app/projects/${projectId}/roadmap?selectedIssue=${ticketData.key}`}
                            >
                              {key}-{ticket.displayValue}
                            </Link>
                          ) : (
                            <Link
                              to={`/app/projects/${projectId}/?selectedIssue=${ticketData.key}`}
                            >
                              {key}-{ticket.displayValue}
                            </Link>
                          )
                        ) : (
                          <Fragment>
                            {key}-{ticket.displayValue}{' '}
                            <span className="deleted-text">(deleted)</span>
                          </Fragment>
                        )}
                      </TicketName>
                    </MainContent>
                  </Right>
                </List>
              );
            })}
          </ListContainer>
        ) : (
          <NoResultText>This project has no history.</NoResultText>
        )}
      </Container>
    </Fragment>
  );
};

IssueHistory.propTypes = {
  project: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
};

const mapStateToProps = (stae, ownProps) =>
  createStructuredSelector({
    members: selectMembers,
  });

export default connect(mapStateToProps, null)(IssueHistory);
