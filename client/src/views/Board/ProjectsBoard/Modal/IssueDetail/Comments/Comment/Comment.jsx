import React from 'react';
import moment from 'moment'
import Icon from '../../../../../../../shared/components/Icon/Icon';
import { defaultUserIcon } from '../../../../../../../shared/constants/projects'
import {
  Container,
  Content,
  TextArea,
  Name,
  Option,
  Delete,
  Time,
} from './Comment.style';
import {
  IconCont
} from '../../IssueDetail.style';

const Comments = ({ comment, userId, userData, deleteComment }) => (
  <Container >
    <IconCont>
      <Icon
        type="user-icon"
        imageUrl={userData ? userData.pictureUrl : defaultUserIcon}
        size={32}
      />
    </IconCont>
    <Content>
      <Name>
        {userData ? userData.name : 'Unknown user'}
        <Time>{moment(comment.date).fromNow()}</Time>
      </Name>
      <TextArea
        value={comment.text}
        readOnly
      />
      <Option>
        {userId === comment.user && (
          <Delete onClick={deleteComment}>Delete</Delete>
        )}
      </Option>
    </Content>
  </Container>
)

export default Comments;