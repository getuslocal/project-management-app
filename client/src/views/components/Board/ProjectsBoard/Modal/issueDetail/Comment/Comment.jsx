import React, { useState } from 'react';
import Icon from '../../../../../../../shared/components/Icon/Icon';
import { selectUser } from '../../../../../../../redux/auth/auth.selectors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addComment, deleteComment } from '../../../../../../../redux/tickets/tickets.actions';
import Button from '../../../../../../../shared/components/Button/Button'
import {
  Container,
  Title,
  Top,
  Textarea,
  Bottom,
  TextAreaWrapper,
  CommentWrapper,
  CommentContent,
  CommentTextarea,
  Name,
  Options,
  Edit,
  Delete,
  Time,
  ButtonsContainer,
} from './Comment.style';

const Comment = ({ currentUser, comments, ticketId, addComment, deleteComment }) => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { _id: userId, pictureUrl } = currentUser;
  return (
    <Container>
      <Title>Comments</Title>
      <Top>
        <Icon iconStyle={{
          base: 'userIcon',
          type: pictureUrl,
          size: '30px',
        }} />
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
      <Bottom>
        {
          comments.map(comment => (
            <CommentWrapper key={comment._id}>
              <Icon iconStyle={{
                base: 'userIcon',
                type: comment.pictureUrl,
                size: '30px',
              }} />
              <CommentContent>
                <Name>{comment.name}
                  <Time>a month ago</Time>
                </Name>
                <CommentTextarea
                  value={comment.text}
                  readOnly
                />
                <Options>
                  {
                    userId === comment.user &&
                    <Delete onClick={() => deleteComment(ticketId, comment._id)}>Delete</Delete>
                  }
                </Options>
              </CommentContent>
            </CommentWrapper>
          ))
        }
      </Bottom>
    </Container>
  )
}

Comment.propTypes = {
  currentUser: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

export default connect(mapStateToProps, { addComment, deleteComment })(Comment);