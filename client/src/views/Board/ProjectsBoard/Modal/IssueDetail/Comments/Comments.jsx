import React, { useState } from 'react';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { selectUser } from '../../../../../../redux/auth/auth.selectors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addComment, deleteComment } from '../../../../../../redux/tickets/tickets.actions';
import Button from '../../../../../../shared/components/Button/Button'
import Comment from './Comment/Comment';
import { IssueHistoryTypes } from '../../../../../../shared/constants/issues';
import {
  Container,
  Title,
  Top,
  Textarea,
  CommentsList,
  TextAreaWrapper,
  ButtonsContainer,
} from './Comments.style';
import {
  IconCont
} from '../IssueDetail.style';

const Comments = ({ currentUser, comments, ticketId, addComment, deleteComment, updateTicketHistory }) => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { _id: userId, pictureUrl } = currentUser;
  return (
    <Container>
      <Title>Comments</Title>
      <Top>
        <IconCont>
          <Icon type="user-icon" imageUrl={pictureUrl} size={32} />
        </IconCont>
        <TextAreaWrapper>
          <Textarea
            name="comments"
            minRows={1}
            maxRows={5}
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={() => setIsOpen(true)}
          />
          {
            isOpen &&
            <ButtonsContainer>
              <Button
                text="Save"
                variant="primary"
                onClick={() => {
                  addComment(ticketId, { text })
                  setText('')
                  setIsOpen(false)
                  updateTicketHistory(null, null, null, IssueHistoryTypes.COMMENT)
                }}
                type="button"
              />
              <Button
                text="Cancel"
                variant="text"
                onClick={() => {
                  setIsOpen(false)
                  setText('')
                }}
                type="button"
              />
            </ButtonsContainer>
          }
        </TextAreaWrapper>
      </Top>
      {
        comments.map(comment =>
          <Comment
            key={comment._id}
            comment={comment}
            userId={userId}
            deleteComment={() => deleteComment(ticketId, comment._id)}
          />
        )
      }
    </Container>
  )
}

Comments.propTypes = {
  currentUser: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

export default connect(mapStateToProps, { addComment, deleteComment })(Comments);