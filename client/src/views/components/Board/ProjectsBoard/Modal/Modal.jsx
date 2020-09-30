import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectCurrentProjectId } from '../../../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import IssueCreate from './IssueCreate/IssueCreate';
import IssueCreateEpic from './IssueCreate/IssueCreateEpic';
import IssueDetailEpic from './IssueDetail/IssueDetailEpic';
import IssueDetail from './IssueDetail/IssueDetail';
import {
  ModalContainer,
} from './Modal.style';

const propTypes = {
  userProfile: PropTypes.object.isRequired,
  currentProjectId: PropTypes.string.isRequired,
};

const defaultProps = {
  isNewEpicModalOpen: false,
  isNewTicketModalOpen: false,
  isTicketModalOpen: false,
  isEpicModalOpen: false,
};

const Modal = ({
  userProfile,
  currentProjectId,
  setIsModalOpen,
  isNewEpicModalOpen,
  isNewTicketModalOpen,
  isEpicModalOpen,
  isTicketModalOpen,
  ticket,
  ...props
}) => {
  return (
    <ModalContainer>
      {
        isNewTicketModalOpen && (
          <IssueCreate
            currentProjectId={currentProjectId}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
          />
        )
      }
      {
        isNewEpicModalOpen && (
          <IssueCreateEpic
            currentProjectId={currentProjectId}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
            {...props}
          />
        )
      }
      {
        isTicketModalOpen && (
          <IssueDetail
            currentProjectId={currentProjectId}
            setIsModalOpen={setIsModalOpen}
            ticket={ticket}
            {...props}
          />
        )
      }
      {
        isEpicModalOpen && (
          <IssueDetailEpic
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
            ticket={ticket}
            {...props}
          />
        )
      }
    </ModalContainer>
  )
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  userProfile: selectUser,
  currentProjectId: selectCurrentProjectId,
});

export default connect(mapStateToProps, null)(Modal);
