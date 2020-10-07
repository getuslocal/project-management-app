import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectMembers } from '../../../../redux/members/members.selectors';
import Icon from '../../../../shared/components/Icon/Icon';
import {
  Container,
  UnorderedList,
  Left,
  Center,
  Name,
  Title,
  Right,
  Counter,
  List,
  ResultCounter
} from './MembersList.style';

export const MembersList = ({ members }) => {
  return (
    <Container>
      <UnorderedList>
        {
          members.map(member => {
            return (
              <List>
                <Left>
                  <Icon type="user-icon" imageUrl={member.pictureUrl} size={45} top={3} />
                </Left>
                <Center>
                  <Name> {member.name}</Name>
                  <Title>UX Designer</Title>
                </Center>
                <Right>
                  {/* <Counter>5</Counter> issues assigned */}
                  view profile
                </Right>
              </List>
            )
          })
        }
      </UnorderedList>
      <ResultCounter>Display {members.length} results</ResultCounter>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  members: selectMembers
})

export default connect(mapStateToProps, null)(MembersList)
