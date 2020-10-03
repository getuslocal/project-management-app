import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUserFilter, selectSearchFilter, selectFilters } from '../../../../../redux/tickets/tickets.selectors';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectMembers } from '../../../../../redux/members/members.selectors';
import { createStructuredSelector } from 'reselect';
import { filterTicketsByUser, removeUserFilter, filterTicketsBySearch, clearAllFilters } from '../../../../../redux/tickets/tickets.actions';
import IssueCreate from '../Modal/IssueCreate/IssueCreate';

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
  members,
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
                members.map(member => {
                  // Check if the user is already filtered.
                  const isActive = userFilter.some(user => user === member._id);
                  return (
                    <IconList key={member._id} onClick={() => {
                      if (isActive) {
                        removeUserFilter(member._id)
                      } else {
                        filterTicketsByUser(member._id)
                      }
                    }}>
                      <CustomIcon
                        type="user-icon"
                        imageUrl={member.pictureUrl}
                        size={37}
                        isActive={isActive}
                      />
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
      {isModalOpen && (
        <IssueCreate
          setIsModalOpen={setIsModalOpen}
          isEpic={isEpicModal}
        />
      )}
    </>
  )
}

TopBar.propTypes = {
  userFilter: PropTypes.array.isRequired,
  searchFilter: PropTypes.string.isRequired,
  userProfile: PropTypes.object.isRequired,
  members: PropTypes.array,
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
  members: selectMembers,
  filters: selectFilters,
});

const mapDispatchToProps = dispatch => ({
  filterTicketsByUser: (userId) => dispatch(filterTicketsByUser(userId)),
  filterTicketsBySearch: (value) => dispatch(filterTicketsBySearch(value)),
  removeUserFilter: (userId) => dispatch(removeUserFilter(userId)),
  clearAllFilters: () => dispatch(clearAllFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
