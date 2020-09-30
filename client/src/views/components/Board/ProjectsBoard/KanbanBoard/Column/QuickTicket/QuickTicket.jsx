import React, { useState } from 'react';
import {
  Container,
  TextArea,
  DropDownMenu,
  Content,
  DropDownContent,
  Button,
  ButtonContainer,
  CloseButton
} from './QuickTicket.style'
import { IssueTypes, IssuePriorities } from '../../../../../../../shared/constants/issues';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import SelectMenu from '../../../Form/FormSelectMenu/SelectMenu/SelectMenu';
import { selectUser } from '../../../../../../../redux/auth/auth.selectors';
import { selectCurrentProjectId } from '../../../../../../../redux/projects/projects.selectors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNewTicket } from '../../../../../../../redux/tickets/tickets.actions';

const QuickTicket = ({ setIsQuickTicketActive, projectId, user, createNewTicket, columnId }) => {
  const [isActive, setIsActive] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: 'Task',
    summary: '',
    description: '',
    reporterId: user._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM
  });
  const { issueType, summary } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    issueFormValues.projectId = projectId;
    createNewTicket(issueFormValues, columnId);
    setIsQuickTicketActive(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const handleSelectMenu = (name, value) => {
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };
  return (
    <Container onClick={() => { if (isActive) setIsActive(false) }}>
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="What needs to be done?"
          name="summary"
          value={summary}
          onChange={handleChange}
          required
        />
        <DropDownMenu>
          <Content onClick={() => setIsActive(true)}>
            <Icon iconStyle={{
              base: 'issue',
              type: issueType,
              size: '9px',
            }} />
            <Icon iconStyle={{
              base: 'angle',
              type: 'down',
              size: '13px',
            }} />
          </Content>
          {
            isActive ?
              <DropDownContent>
                <SelectMenu
                  handleSelectMenu={handleSelectMenu}
                  selectList={{
                    ...IssueTypes,
                    [issueType.toUpperCase()]: undefined,
                    ['EPIC']: undefined
                  }}
                  name="issueType"
                  value={issueType}
                  width="130px"
                  iconStyle={{
                    base: 'issue',
                    size: '9px',
                  }}
                />
              </DropDownContent>
              :
              <></>
          }
        </DropDownMenu>
        <ButtonContainer>
          <Button type="submit" value="Create" />
          <CloseButton onClick={() => setIsQuickTicketActive(false)}>Cancel</CloseButton>
        </ButtonContainer>
      </form>
    </Container>
  )
}


QuickTicket.propTypes = {
  user: PropTypes.object.isRequired,
  createNewTicket: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  projectId: selectCurrentProjectId,
});

export default connect(mapStateToProps, { createNewTicket })(QuickTicket);
