import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
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
  membersList: PropTypes.object,
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
  members,
  userProfile,
  currentProjectId,
  setIsModalOpen,
  isNewEpicModalOpen,
  isNewTicketModalOpen,
  isEpicModalOpen,
  isTicketModalOpen,
  ...props
}) => {
  return (
    <ModalContainer>
      {
        isNewTicketModalOpen && (
          <IssueCreate
            currentProjectId={currentProjectId}
            membersList={members[currentProjectId]}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
          />
        )
      }
      {
        isNewEpicModalOpen && (
          <IssueCreateEpic
            currentProjectId={currentProjectId}
            membersList={members[currentProjectId]}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
            {...props}
          />
        )
      }
      {
        isTicketModalOpen && (
          <IssueDetail
            membersList={members[currentProjectId]}
            currentProjectId={currentProjectId}
            setIsModalOpen={setIsModalOpen}
            {...props}
          />
        )
      }
      {
        isEpicModalOpen && (
          <IssueDetailEpic
            membersList={members[currentProjectId]}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
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
  members: selectMembers,
});

export default connect(mapStateToProps, null)(Modal);
