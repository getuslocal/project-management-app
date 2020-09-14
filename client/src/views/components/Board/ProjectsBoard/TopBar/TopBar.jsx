import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUserFilter, selectSearchFilter, selectFilters } from '../../../../../redux/tickets/tickets.selectors';
import { selectUser } from '../../../../../redux/auth/auth.selectors';
import { selectMembersByProjectId } from '../../../../../redux/members/members.selectors';
import { createStructuredSelector } from 'reselect';
import { filterTicketsByUser, removeUserFilter, filterTicketsBySearch, clearAllFilters } from '../../../../../redux/tickets/tickets.actions';
import NewIssueModal from '../NewIssueModal/NewIssueModal';
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
  ClearButton
} from './TopBar.style';

const TopBar = ({
  project: { name, _id: projectId },
  userFilter,
  membersList,
  filterTicketsByUser,
  filterTicketsBySearch,
  removeUserFilter,
  clearAllFilters,
  filters,
  searchFilter,
  userProfile,
  renderStyle,
}) => {

  const isFiltering = Object.keys(filters).some(key => filters[key].length > 0)
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <Container>
      {
        isModalActive &&
        <NewIssueModal
          setIsModalActive={setIsModalActive}
          currentProjectId={projectId}
          membersList={membersList}
          userProfile={userProfile}
        />
      }
      <Left>
        <Breadcrumbs>Projects / {name}</Breadcrumbs>
        <ModalButton renderStyle={renderStyle} onClick={() => setIsModalActive(true)}>
          {
            renderStyle === "RoadMapBoard" ?
              "Create epic"
              :
              "Create issue"
          }
        </ModalButton>
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
