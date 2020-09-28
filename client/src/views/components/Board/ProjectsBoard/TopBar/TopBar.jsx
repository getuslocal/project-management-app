import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUserFilter, selectSearchFilter, selectFilters } from '../../../../../redux/tickets/tickets.selectors';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectMembersByProjectId } from '../../../../../redux/members/members.selectors';
import { createStructuredSelector } from 'reselect';
import { filterTicketsByUser, removeUserFilter, filterTicketsBySearch, clearAllFilters } from '../../../../../redux/tickets/tickets.actions';
import Modal from '../Modal/Modal';

import {
  Container,
  Breadcrumbs,
  InputContainer,
  Input,
  ModalButton,
  Left,
  Right,
  Members,
  IconList,
  CustomIcon,
  ClearButton,
} from './TopBar.style';

const TopBar = ({
  project: { name },
  userFilter,
  membersList,
  filterTicketsByUser,
  filterTicketsBySearch,
  removeUserFilter,
  clearAllFilters,
  filters,
  searchFilter,
  isEpicModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFiltering = Object.keys(filters).some(key => filters[key].length > 0)
  return (
    <>
      <Container>
        <Left>
          <Breadcrumbs>Projects / {name}</Breadcrumbs>
          <ModalButton
            isEpicModal={isEpicModal}
            onClick={() => setIsModalOpen(true)}
          >Create {isEpicModal ? 'Epic' : 'Issue'}</ModalButton>
        </Left>
        <Right>
          <InputContainer className="icon-search">
            <Input placeholder="Filter issues..." value={searchFilter} onChange={(e) => filterTicketsBySearch(e.target.value)} />
          </InputContainer>
          <Members>
            <ul>
              {
                Object.keys(membersList).map(key => {
                  // Check if the user is already filtered.
                  const isActive = userFilter.some(user => user === key);
                  return (
                    <IconList key={key} onClick={() => {
                      if (isActive) {
                        removeUserFilter(key)
                      } else {
                        filterTicketsByUser(key)
                      }
                    }}>
                      <CustomIcon isActive={isActive} iconStyle={{
                        base: 'userIcon',
                        type: membersList[key].pictureUrl,
                        size: '37px',
                      }} />
                    </IconList>
                  )
                })
              }
            </ul>
          </Members>
          {
            isFiltering &&
            <ClearButton onClick={clearAllFilters}>Clear filters</ClearButton>
          }
        </Right>
      </Container>
      {isModalOpen &&
        <Modal
          isNewTicketModalOpen={!isEpicModal}
          isNewEpicModalOpen={isEpicModal}
          setIsModalOpen={setIsModalOpen}
        />
      }
    </>
  )
}

TopBar.propTypes = {
  userFilter: PropTypes.array.isRequired,
  searchFilter: PropTypes.string.isRequired,
  userProfile: PropTypes.object.isRequired,
  membersList: PropTypes.object,
  filters: PropTypes.object.isRequired,
  filterTicketsByUser: PropTypes.func.isRequired,
  filterTicketsBySearch: PropTypes.func.isRequired,
  removeUserFilter: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  userFilter: selectUserFilter,
  searchFilter: selectSearchFilter,
  userProfile: selectUser,
  membersList: selectMembersByProjectId(ownProps.project._id),
  filters: selectFilters,
});

const mapDispatchToProps = dispatch => ({
  filterTicketsByUser: (userId) => dispatch(filterTicketsByUser(userId)),
  filterTicketsBySearch: (value) => dispatch(filterTicketsBySearch(value)),
  removeUserFilter: (userId) => dispatch(removeUserFilter(userId)),
  clearAllFilters: () => dispatch(clearAllFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
