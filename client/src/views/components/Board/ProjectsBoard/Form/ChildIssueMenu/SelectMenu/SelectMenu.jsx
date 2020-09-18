import React from 'react';
import {
  Container,
  MainContent,
  ListItem,
  Button
} from './SelectMenu.style';
import Icon from '../../../../../../../shared/components/Icon/Icon';

const SelectMenu = ({ handleChildIssueMenu, ticketList, childIssues }) => {
  return (
    <Container >
      <MainContent>
        <ul>
          {
            ticketList.map(({ _id, key, summary, issueType }) => {
              const isActive = childIssues.find(issue => issue._id === _id);
              return (
                <ListItem
                  key={key}
                  isActive={isActive}
                  onClick={() => handleChildIssueMenu({ _id, key, summary, issueType }, isActive)}
                >
                  {isActive && <Button ><i className="fas fa-times"></i></Button>}
                  <Icon iconStyle={{
                    base: 'issue',
                    type: issueType,
                    size: '9px',
                  }} />
                  {key} - {summary}
                </ListItem>
              )
            })
          }
        </ul>
      </MainContent>
    </Container>
  )
}

export default SelectMenu;