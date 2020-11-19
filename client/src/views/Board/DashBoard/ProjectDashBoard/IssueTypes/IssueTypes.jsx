import React, { Fragment } from 'react'
import Icon from '../../../../../shared/components/Icon/Icon'
import { IssueTypes } from '../../../../../shared/constants/issues';
import {
  Block,
  IconContainer,
  BlockContent,
  Number,
  BlockTitle,
  Row,
} from './IssueTypes.style';

export const IssueTypesBlock = ({ tickets }) => {
  console.log(tickets)
  return (
    <Fragment>
      <Row>
        <Block style={{ marginRight: '20px' }}>
          <IconContainer>
            <Icon type="check" isSolid={true} size={18} style={{ backgroundColor: 'rgba(79, 173, 230, .2)', color: 'rgb(79, 173, 230)' }}></Icon>
          </IconContainer>
          <BlockContent>
            <Number>{tickets.filter(ticket => ticket.issueType === IssueTypes.TASK).length}</Number>
            <BlockTitle>Tasks</BlockTitle>
          </BlockContent>
        </Block>
        <Block >
          <IconContainer>
            <Icon type="bomb" isSolid={true} size={18} style={{ backgroundColor: 'rgba(228, 77, 66, .2)', color: 'rgb(228, 77, 66)' }}></Icon>
          </IconContainer>
          <BlockContent>
            <Number>{tickets.filter(ticket => ticket.issueType === IssueTypes.BUG).length}</Number>
            <BlockTitle>Bugs</BlockTitle>
          </BlockContent>
        </Block>
      </Row>
      <Row>
        <Block style={{ marginRight: '20px' }}>
          <IconContainer>
            <Icon type="bookmark" isSolid={true} size={20} style={{ backgroundColor: 'rgba(101, 186, 67, .2)', color: 'rgb(101, 186, 67)' }}></Icon>
          </IconContainer>
          <BlockContent>
            <Number>{tickets.filter(ticket => ticket.issueType === IssueTypes.STORY).length}</Number>
            <BlockTitle>Stories</BlockTitle>
          </BlockContent>
        </Block>
        <Block >
          <IconContainer>
            <Icon type="bolt" isSolid={true} size={20} style={{ backgroundColor: 'rgba(101, 84, 192, .2)', color: 'rgb(101, 84, 192)' }}></Icon>
          </IconContainer>
          <BlockContent>
            <Number>{tickets.filter(ticket => ticket.issueType === IssueTypes.EPIC).length}</Number>
            <BlockTitle>Epics</BlockTitle>
          </BlockContent>
        </Block>
      </Row>
    </Fragment>
  )
}

export default IssueTypesBlock
