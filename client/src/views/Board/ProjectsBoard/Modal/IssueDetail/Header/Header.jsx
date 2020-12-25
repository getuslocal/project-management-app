import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectEpicById } from '../../../../../../redux/tickets/tickets.selectors';
import { Container, Key, Left, Right, Slash } from './Header.style';

const IssueDetailHeader = ({
  epic,
  ticketKey,
  issueType,
  closeModal,
  projectKey,
  setConfirmationModal,
}) => {
  return (
    <Container>
      <Left>
        {epic && (
          <Fragment>
            <Key className="icon-issue-epic">{epic.summary}</Key>
            <Slash style={{ margin: '0 6px' }}>/</Slash>
          </Fragment>
        )}
        <Key className={`icon-issue-${issueType.toLowerCase()}`}>
          {projectKey}-{ticketKey}
        </Key>
      </Left>
      <Right>
        <Icon
          type="trash"
          onClick={() => setConfirmationModal(true)}
          size={20}
        />
        <Icon type="close" onClick={closeModal} isSolid={true} size={20} />
      </Right>
    </Container>
  );
};

IssueDetailHeader.propTypes = {
  epic: PropTypes.object,
  ticketKey: PropTypes.number.isRequired,
  issueType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  projectKey: PropTypes.string.isRequired,
  setConfirmationModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    epic: selectEpicById(ownProps.linkedEpic),
  });

export default connect(mapStateToProps, null)(IssueDetailHeader);
