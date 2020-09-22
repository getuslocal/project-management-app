import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectTickets } from '../../../../../../redux/tickets/tickets.selectors';
import SelectMenu from './SelectMenu/SelectMenu';
import { IssueTypes } from '../../../../../../shared/constants/issues';
import {
  FormContainer,
  Description,
} from '../Form.style';
import {
  InnerContainer,
  ListContainer,
  List,
  AddButton,
  Label
} from './ChildIssueMenu.style';
import Icon from '../../../../../../shared/components/Icon/Icon';

const ChildissueMenu = ({
  label,
  name,
  childIssues,
  handleChildIssueMenu,
  handleModalOpen,
  isModalOpen,
  tickets,
  isEpicTicket
}) => {
  return (
    <FormContainer>
      <Label isEpicTicket={isEpicTicket}>{label}</Label>
      <InnerContainer
        isEpicTicket={isEpicTicket}
        onClick={e => !isEpicTicket ? handleModalOpen(name) : e.preventDefault()}
      >
        <ListContainer isEpicTicket={isEpicTicket}>
          {
            childIssues.length > 0 ?
              childIssues.map(issue => {
                const thisIssue = tickets.filter(ticket => ticket._id === issue)[0]
                return (
                  <List key={thisIssue.key} isEpicTicket={isEpicTicket}>
                    <Icon iconStyle={{
                      base: 'issue',
                      type: thisIssue.issueType,
                      size: '9px',
                    }} />
                    <span>{thisIssue.key}</span>
                    {' '}-{' '}{thisIssue.summary}
                  </List>
                )
              })
              :
              <List style={{ color: '#6c798f' }}>
                {
                  (isEpicTicket || tickets.length === 0) ? (
                    'No child issues found'
                  ) : (
                      'Add child issues...'
                    )
                }
              </List>
          }
        </ListContainer>
      </InnerContainer>
      {
        isModalOpen === name ?
          <SelectMenu
            handleChildIssueMenu={handleChildIssueMenu}
            // Pass tickets which are not epic issue types.
            ticketList={tickets.filter(ticket => ticket.issueType !== IssueTypes.EPIC)}
            childIssues={childIssues}
          />
          :
          <></>
      }
      {
        isEpicTicket ?
          <AddButton type="button" onClick={() => handleModalOpen(name)}>+ Add child issue</AddButton>
          :
          <Description>Click to search for issues to link. If you leave it blank, no link will be made.</Description>
      }
    </FormContainer>
  )
}

ChildissueMenu.propTypes = {
  tickets: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tickets: selectTickets,
});

export default connect(mapStateToProps, null)(ChildissueMenu);
