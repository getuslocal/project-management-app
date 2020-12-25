import React, { useState, Fragment, useRef, useEffect } from 'react';
import {
  IssueTypes,
  IssuePriorities,
} from '../../../../../../../shared/constants/issues';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import SelectMenu from '../../../../../../../shared/components/SelectMenu/SelectMenu';
import { selectUser } from '../../../../../../../redux/auth/auth.selectors';
import { selectCurrentProject } from '../../../../../../../redux/projects/projects.selectors';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createNewTicket } from '../../../../../../../redux/tickets/tickets.actions';
import useOutsideClick from '../../../../../../../shared/hooks/useOutsideClick';
import {
  Container,
  TextArea,
  DueDate,
  DropDownMenu,
  Content,
  Button,
  IconCont,
  AngleDownIcon,
  Bottom,
} from './QuickIssueCreate.style';
import { setAlert } from '../../../../../../../redux/alert/alert.actions';

const QuickIssueCreate = ({
  momentDate,
  setIsContentActive,
  project,
  user,
  createNewTicket,
  setAlert,
}) => {
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef();
  const [issueFormValues, setIssueFormValues] = useState({
    issueType: IssueTypes.TASK,
    summary: '',
    description: '',
    reporterId: user._id,
    assigneeId: '',
    issuePriority: IssuePriorities.MEDIUM,
  });
  const { issueType, summary } = issueFormValues;

  useOutsideClick(contentRef, () => {
    setIsContentActive(false);
  });

  useEffect(() => {
    scrollIntoViewIfNeeded(contentRef.current);
  }, []);

  function scrollIntoViewIfNeeded(target) {
    // @TODO: Figure out a better way of handling this.
    const targetTop = 230;
    if (target.getBoundingClientRect().top < targetTop) {
      target.scrollIntoView();
    }

    if (target.getBoundingClientRect().bottom > window.innerHeight) {
      target.scrollIntoView(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const columnId = project.columnOrder[0];

    issueFormValues.projectId = project._id;
    issueFormValues.dueDate = momentDate;
    issueFormValues.columnId = columnId;
    issueFormValues.linkedEpic = null;
    // Add an issue to the first column of the board.
    createNewTicket(issueFormValues, columnId);
    // Close the content.
    setIsContentActive(false);
    setAlert('A new issue is created !', 'success');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIssueFormValues({ ...issueFormValues, [name]: value });
  };

  const checkIsFirstWeekOfCalendar = (momentDate) => {
    const dateStart = moment()
      .subtract(12, 'months')
      .startOf('month')
      .day('Sunday');
    return moment(momentDate).isSame(dateStart, 'week');
  };

  return (
    <Container
      ref={contentRef}
      isLeftPosition={momentDate.day() >= 4}
      isFirstWeekOfCalendar={checkIsFirstWeekOfCalendar(momentDate)}
    >
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="What needs to be done?"
          name="summary"
          value={summary}
          onChange={handleChange}
          required
        />
        <DueDate>
          <span>Due date :</span> {momentDate.format('MMM DD, YYYY')}
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
          <Button type="submit" value="Create" />
        </Bottom>
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

QuickIssueCreate.propTypes = {
  user: PropTypes.object.isRequired,
  createNewTicket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  project: selectCurrentProject,
});

export default connect(mapStateToProps, { createNewTicket, setAlert })(
  QuickIssueCreate
);
