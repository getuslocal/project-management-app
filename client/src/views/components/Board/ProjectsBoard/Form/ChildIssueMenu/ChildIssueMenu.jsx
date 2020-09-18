import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectTickets } from '../../../../../../redux/tickets/tickets.selectors';
import SelectMenu from './SelectMenu/SelectMenu';
import {
  FormContainer,
  Label,
  Description,
} from '../Form.style';
import {
  InnerContainer,
  Button,
  ListContainer,
  List
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
}) => {
  return (
    <FormContainer>
      <Label>{label}</Label>
      <InnerContainer onClick={() => handleModalOpen(name)} >
        <ListContainer>
          {
            childIssues.length > 0 ?
              childIssues.map(issue => (
                <List key={issue.key}>
                  {/* {issue.key}<Button ><i class="fas fa-times"></i></Button> */}
                  <Icon iconStyle={{
                    base: 'issue',
                    type: issue.issueType,
                    size: '9px',
                  }} />
                  {issue.key} - {issue.summary}
                </List>
              ))
              :
              <List style={{color: '#6c798f'}}>Add child issues...</List>
          }
        </ListContainer>
      </InnerContainer>
      {
        isModalOpen === name ?
          <SelectMenu
            handleChildIssueMenu={handleChildIssueMenu}
            ticketList={tickets}
            childIssues={childIssues}
          />
          :
          <></>
      }
      <Description>Click to search for issues to link. If you leave it blank, no link will be made.</Description>
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
