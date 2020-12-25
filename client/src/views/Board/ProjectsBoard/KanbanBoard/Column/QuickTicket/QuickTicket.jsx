import React, { useState, Fragment } from 'react';
import {
  Container,
  TextArea,
  DropDownMenu,
  Content,
  Button,
  ButtonContainer,
  CloseButton,
  IconCont,
  AngleDownIcon,
} from './QuickTicket.style';
import {
  IssueTypes,
  IssuePriorities,
} from '../../../../../../shared/constants/issues';
import Icon from '../../../../../../shared/components/Icon/Icon';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import { selectUser } from '../../../../../../redux/auth/auth.selectors';
import { selectCurrentProjectId } from '../../../../../../redux/projects/projects.selectors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNewTicket } from '../../../../../../redux/tickets/tickets.actions';

const QuickTicket = ({
  setIsQuickTicketActive,
  projectId,
  user,
  createNewTicket,
  columnId,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: user._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM,
  });
  const { issueType, summary } = issueFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    issueFormValues.projectId = projectId;
    issueFormValues.columnId = columnId;
    issueFormValues.linkedEpic = null;
    issueFormValues.dueDate = null;
    createNewTicket(issueFormValues, columnId);
    setIsQuickTicketActive(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  return (
    <Container
      onClick={() => {
        if (isActive) setIsActive(false);
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="What needs to be done?"
          name="summary"
          value={summary}
          autoFocus
          onChange={handleChange}
          required
        />
        <DropDownMenu>
          <Content onClick={() => setIsActive(true)}>
            <Icon type={issueType.toLowerCase()} size={12} />
            <AngleDownIcon>
              <Icon type="angle-down" size={13} isSolid={true} />
            </AngleDownIcon>
          </Content>
          <SelectMenu
            isActive={isActive}
            width={150}
            left={-10}
            setIsMenuOpen={setIsActive}
            onChange={(option) =>
              setIssueFormValues({
                ...issueFormValues,
                issueType: option.value,
              })
            }
            options={renderType(IssueTypes, issueType)}
            renderValue={({ value: issueType }) => renderOption(issueType)}
          />
        </DropDownMenu>
        <ButtonContainer>
          <Button type="submit" value="Create" />
          <CloseButton onClick={() => setIsQuickTicketActive(false)}>
            Cancel
          </CloseButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};

const renderType = (IssueTypes, currentType) =>
  Object.values(IssueTypes)
    .filter((type) => type !== currentType && type !== IssueTypes.EPIC)
    .map((option) => ({
      key: option,
      value: option,
    }));

const renderOption = (issueType) => (
  <Fragment>
    <IconCont>
      <Icon type={issueType.toLowerCase()} size={12} top={-1} />
    </IconCont>
    {issueType}
  </Fragment>
);

QuickTicket.propTypes = {
  user: PropTypes.object.isRequired,
  createNewTicket: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  projectId: selectCurrentProjectId,
});

export default connect(mapStateToProps, { createNewTicket })(QuickTicket);
