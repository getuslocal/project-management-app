import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectNonEpicTickets, selectEpicTickets } from '../../../../../../redux/tickets/tickets.selectors';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { IssueColors } from '../../../../../../shared/constants/issues'
import {
  ListContainer,
  List,
  IconCont,
  Close,
  Key,
  SelectItem,
  Summary,
  LinkedEpic,
  Left,
  Right,
  RightTop,
  RightBottom,
} from './ChildIssue.style';
import {
  SectionContainer,
  SectionTitle,
  Description
} from '../IssueCreate.style';

const IssueCreateChildIssue = ({
  childIssues,
  setChildIssues,
  tickets,
  epics
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const addChildIssue = (ticket) => {
    setChildIssues([...childIssues, ticket._id])
  }
  const deleteChildIssue = (event, removedIssue) => {
    // Prevent parent onClick firing.
    event.stopPropagation();
    setChildIssues(childIssues.filter(issue => issue !== removedIssue))
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
                <List key={thisIssue.key} >
                  <Close onClick={(event) => deleteChildIssue(event, issue)}>
                    <Icon type="close" isSolid={true} size={11} />
                  </Close>
                  <IconCont>
                    <Icon type={thisIssue.issueType.toLowerCase()} isSolid={true} size={12} top={-1} />
                  </IconCont>
                  <Key>{thisIssue.key}</Key>
                  <Summary>{thisIssue.summary}</Summary>
                </List>
              )
            })
            : (
              <List style={{ color: '#6c798f' }}>
                Add child issues...
              </List>
            )
        }
      </ListContainer>
      <SelectMenu
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) => addChildIssue(option.value)}
        options={issueOptions(tickets, childIssues)}
        renderValue={({ value: ticket }) => renderOption(ticket, epics)}
      />
      <Description>Click to search for issues to link. If you leave it blank, no link will be made.</Description>
    </SectionContainer>
  )
}

const issueOptions = (tickets, childIssues) => (
  tickets.filter(ticket => !childIssues.includes(ticket._id)).map(ticket => ({
    key: ticket._id,
    value: ticket,
  }))
);

const renderOption = (ticket,epics) => {
  const linkedEpic = epics.find(epic => epic._id === ticket.linkedEpic);
  return (
    <SelectItem>
      <Left>
        <Icon type={ticket.issueType.toLowerCase()} isSolid={true} size={13} top={1} />
      </Left>
      <Right>
        <RightTop>
          <Key>{ticket.key}:</Key>
          {ticket.summary}
        </RightTop>
        <RightBottom>
          {linkedEpic &&
            <LinkedEpic
              style={{
                backgroundColor: IssueColors[linkedEpic.issueColor.toUpperCase()].bg,
                color: IssueColors[linkedEpic.issueColor.toUpperCase()].font
              }}
            >{linkedEpic.summary}</LinkedEpic>
          }
        </RightBottom>
      </Right>
    </SelectItem>
  )
}

IssueCreateChildIssue.propTypes = {
  childIssues: PropTypes.array.isRequired,
  setChildIssues: PropTypes.func.isRequired,
  tickets: PropTypes.array.isRequired,
  epics: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tickets: selectNonEpicTickets,
  epics: selectEpicTickets
});

export default connect(mapStateToProps, null)(IssueCreateChildIssue);
