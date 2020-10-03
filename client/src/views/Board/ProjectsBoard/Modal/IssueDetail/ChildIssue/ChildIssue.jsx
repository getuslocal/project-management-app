import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectNonEpicTickets } from '../../../../../../redux/tickets/tickets.selectors';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import {
  ListContainer,
  List,
  IconCont,
  Close,
  Key,
  SectionTitle,
  SelectItem,
  AddButton
} from './ChildIssue.style';
import {
  SectionContainer,
} from '../IssueDetail.style';

const IssueDetailChildIssue = ({
  epicId,
  updateTicket,
  tickets,
  childIssues,
  setChildIssues
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addChildIssue = (ticket) => {
    setChildIssues([...childIssues, ticket._id])
    updateTicket(ticket._id, { linkedEpic: epicId });
  }
  const deleteChildIssue = (event, ticketId) => {
    // Prevent parent onClick firing.
    event.stopPropagation();
    setChildIssues(childIssues.filter(issue => issue !== ticketId))
    updateTicket(ticketId, { linkedEpic: null });
  }

  return (
    <SectionContainer>
      <SectionTitle >Child issues</SectionTitle>
      <ListContainer onClick={() => setIsMenuOpen(true)} >
        {
          childIssues.length > 0 ?
            childIssues.map(issue => {
              const thisIssue = tickets.find(ticket => ticket._id === issue)
              return (
                <List key={thisIssue.key} isEpicTicket={true}>
                  <Close onClick={(event) => deleteChildIssue(event, issue)}>
                    <Icon type="close" isSolid={true} size={11} />
                  </Close>
                  <IconCont>
                    <Icon type={thisIssue.issueType.toLowerCase()} isSolid={true} size={12} top={-1} />
                  </IconCont>
                  <Key>{thisIssue.key}</Key>
                  {thisIssue.summary}
                </List>
              )
            })
            : (
              <AddButton>+ Add child issue</AddButton>
            )
        }
      </ListContainer>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => addChildIssue(option.value)}
        options={issueOptions(tickets, childIssues)}
        renderValue={({ value: ticket }) => renderOption(ticket)}
      />
    </SectionContainer>
  )
}

const issueOptions = (tickets, childIssues) => (
  tickets.filter(ticket => !childIssues.includes(ticket._id)).map(ticket => ({
    key: ticket._id,
    value: ticket,
  }))
);

const renderOption = (ticket) => {
  return (
    <SelectItem>
      <Icon type={ticket.issueType.toLowerCase()} isSolid={true} size={13} />
      <Key style={{ fontWeight: 500 }}>{ticket.key}</Key>
      {ticket.summary}
    </SelectItem>
  )
}

IssueDetailChildIssue.propTypes = {
  tickets: PropTypes.array.isRequired,
  childIssues: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tickets: selectNonEpicTickets,
});

export default connect(mapStateToProps, null)(IssueDetailChildIssue);
