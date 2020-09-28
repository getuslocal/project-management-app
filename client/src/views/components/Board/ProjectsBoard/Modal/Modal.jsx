import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import { selectCurrentProjectId } from '../../../../../redux/projects/projects.selectors';
import { createStructuredSelector } from 'reselect';
import NewTicketModal from './NewTicketModal/NewTicketModal';
import NewEpicModal from './NewTicketModal/NewEpicModal/NewEpicModal';
import EpicModal from './TicketModal/EpicModal/EpicModal';
import TicketModal from './TicketModal/TicketModal';
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
        isNewEpicModalOpen && (
          <NewEpicModal
            currentProjectId={currentProjectId}
            membersList={members[currentProjectId]}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
            {...props}
          />
        )
      }
      {
        isNewTicketModalOpen && (
          <NewTicketModal
            currentProjectId={currentProjectId}
            membersList={members[currentProjectId]}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
          />
        )
      }
      {
        isEpicModalOpen && (
          <EpicModal
            membersList={members[currentProjectId]}
            userProfile={userProfile}
            setIsModalOpen={setIsModalOpen}
            {...props}
          />
        )
      }
      {
        isTicketModalOpen && (
          <TicketModal
            membersList={members[currentProjectId]}
            currentProjectId={currentProjectId}
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
