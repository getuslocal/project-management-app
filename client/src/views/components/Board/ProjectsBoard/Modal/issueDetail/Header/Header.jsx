import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Key,
  Left,
  Right,
  Slash,
} from './Header.style';

const IssueDetailHeader = ({
  linkedEpic,
  ticketKey,
  issueType,
  handleDeleteTicket,
  setIsModalOpen
}) => {
  return (
    <Container>
      <Left>
        {
          linkedEpic &&
          <Fragment>
            <Key className="icon-issue-epic">{linkedEpic.summary}</Key>
            <Slash style={{ margin: '0 6px' }}>/</Slash>
          </Fragment>
        }
        <Key className={`icon-issue-${issueType.toLowerCase()}`}>{ticketKey}</Key>
      </Left>
      <Right>
        <i className="far fa-trash-alt" onClick={handleDeleteTicket}></i>
        <i className="fas fa-times" onClick={() => setIsModalOpen(false)}></i>
      </Right>
    </Container>
  )
}

IssueDetailHeader.propTypes = {
  linkedEpic: PropTypes.object,
  ticketKey: PropTypes.string.isRequired,
  issueType: PropTypes.string.isRequired,
  handleDeleteTicket: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
}

export default IssueDetailHeader

