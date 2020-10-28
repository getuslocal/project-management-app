import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../../../../shared/components/Icon/Icon'
import HorizontalProgressBar from '../../../../../../shared/components/HorizontalProgressBar/HorizontalProgressBar'
import {
  Container,
  OpenIcon,
  Title,
  Progress,
  Top,
  Bottom,
  ChildIssueDetail,
  CheckIcon,
  ChildIssueTitle,
  NoIssuesMessage,
} from './EpicDetail.style'

const EpicDetail = ({
  epicColorProperty,
  isChildIssuesVisible,
  setIsChildIssuesVisible,
  openIssueDetailModal,
  epic,
  childIssues,
  members,
}) => {
  const numberOfCompletedIssues = childIssues.filter(issue => issue.isDone).length;
  return (
    <Container backgroundColor={epicColorProperty.bg}>
      <Top>
        <OpenIcon
          backgroundColor={epicColorProperty.border}
          onClick={() => setIsChildIssuesVisible(!isChildIssuesVisible)}
          isOpen={isChildIssuesVisible}
        >
          <Icon type="angle-down" size={14} isSolid={true} />
        </OpenIcon>
        <div>
          <Title onClick={() => openIssueDetailModal(epic.key)}>{epic.summary}</Title>
          <HorizontalProgressBar
            value={numberOfCompletedIssues}
            total={childIssues.length}
            color={epicColorProperty.border}
            height={3}
            backgroundColor={'rgba(0,0,0, .2)'}
          />
        </div>
        {/* 
          <NewChildIssueButton className="new-child-issue-button">
            <Icon type="plus" size={12} isSolid={true} />
          </NewChildIssueButton> 
        */}
      </Top>
      <Bottom>
        {
          isChildIssuesVisible && (
            childIssues.length > 0 ? (
              childIssues.map(issue => {
                const assignee = members.find(member => member._id === issue.assigneeId);
                return (
                  <ChildIssueDetail key={issue._id} >
                    <CheckIcon
                      className="square"
                      type={issue.isDone ? 'check-square' : 'square'}
                      size={16}
                      isDone={issue.isDone}
                    />
                    <ChildIssueTitle onClick={() => openIssueDetailModal(issue.key)}>{issue.summary}</ChildIssueTitle>
                    <Icon className="user-icon" type="user-icon" imageUrl={assignee && assignee.pictureUrl} size={24} top={2} />
                  </ChildIssueDetail>
                )
              })
            ) : (
                <NoIssuesMessage>No child issues added.</NoIssuesMessage>
              )
          )
        }
      </Bottom>
    </Container >
  )
}

EpicDetail.propTypes = {
  epicColorProperty: PropTypes.object.isRequired,
  isChildIssuesVisible: PropTypes.bool.isRequired,
  setIsChildIssuesVisible: PropTypes.func.isRequired,
  openIssueDetailModal: PropTypes.func.isRequired,
  epic: PropTypes.object.isRequired,
  childIssues: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
}

export default EpicDetail
