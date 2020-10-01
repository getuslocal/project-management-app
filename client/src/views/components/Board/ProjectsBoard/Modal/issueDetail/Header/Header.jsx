import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../../../../../shared/components/Icon/Icon';
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
        <Icon type="trash" onClick={handleDeleteTicket} size={20} />
        <Icon type="close" onClick={() => setIsModalOpen(false)} isSolid={true} size={20}/>
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

