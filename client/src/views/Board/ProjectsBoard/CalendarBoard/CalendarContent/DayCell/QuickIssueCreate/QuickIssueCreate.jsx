import React, { useState, Fragment, useRef } from 'react';
import { IssueTypes, IssuePriorities } from '../../../../../../../shared/constants/issues';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';
import { selectUser } from '../../../../../../../redux/auth/auth.selectors';
import { selectCurrentProject } from '../../../../../../../redux/projects/projects.selectors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNewTicket } from '../../../../../../../redux/tickets/tickets.actions';
import useOutsideClick from "../../../../../../../shared/hooks/useOutsideClick";
import {
  Container,
  TextArea,
  DueDate,
  DropDownMenu,
  Content,
  Button,
  IconCont,
  AngleDownIcon,
  Bottom
} from './QuickIssueCreate.style'

const QuickIssueCreate = ({
  momentDate,
  setIsContentActive,
  project,
  user,
  createNewTicket,
}) => {
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef();
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: user._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM
  });
  const { issueType, summary } = issueFormValues;

  useOutsideClick(contentRef, () => {
    setIsContentActive(false)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    issueFormValues.projectId = project._id;
    issueFormValues.dueDate = momentDate;
    // Add an issue to the first column of the board.
    const columnId = project.columnOrder[0]
    createNewTicket(issueFormValues, columnId);
    // Close the content.
    setIsContentActive(false);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  return (
    <Container ref={contentRef} isLeftPosition={(momentDate.day() >= 4)} >
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="What needs to be done?"
          name="summary"
          value={summary}
          onChange={handleChange}
          required
        />
        <DueDate>
          <span>Due date :</span> {momentDate.format("MMM DD, YYYY")}
        </DueDate>
        <Bottom>
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
              setIsMenuOpen={setIsActive}
              onChange={(option) => setIssueFormValues({ ...issueFormValues, issueType: option.value })}
              options={renderType(IssueTypes, issueType)}
              renderValue={({ value: issueType }) => renderOption(issueType)}
            />
          </DropDownMenu>
          <Button type="submit" value="Create" />
        </Bottom>
      </form>
    </Container>
  )
}

const renderType = (IssueTypes, currentType) => (
  Object.values(IssueTypes).filter(type => type !== currentType && type !== IssueTypes.EPIC).map(option => ({
    key: option,
    value: option,
  }))
)

const renderOption = (issueType) => (
  <Fragment>
    <IconCont>
      <Icon type={issueType.toLowerCase()} size={12} top={-1} />
    </IconCont>
    {issueType}
  </Fragment>
);

QuickIssueCreate.propTypes = {
  user: PropTypes.object.isRequired,
  createNewTicket: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  project: selectCurrentProject,
});

export default connect(mapStateToProps, { createNewTicket })(QuickIssueCreate);
