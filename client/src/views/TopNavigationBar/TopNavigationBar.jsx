import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Content,
  BoardTitleContainer,
  BoardTitle,
  ArrowNavigation,
  SearchBox,
  Tabs,
  Tab,
} from './TopNavigationBar.style'

const TopNavigationBar = ({ title, tabs, baseUrl, currentTab }) => {
  return (
    <Container>
      <Content>
        <BoardTitleContainer>
          <BoardTitle>{title}</BoardTitle>
          <ArrowNavigation>
            <i className="fas fa-chevron-left"></i>
            <i className="fas fa-chevron-right"></i>
          </ArrowNavigation>
        </BoardTitleContainer>
        <SearchBox>
          <i className="fas fa-search" ></i>
          <input type="text" placeholder="Find something" />
        </SearchBox>
      </Content>
      <Tabs>
        {
          tabs.map((tab, index) => (
            <Tab key={index} className={currentTab === tab.linkUrl.replace('/', '') ? 'active' : ''} >
              <Link to={`${baseUrl}${tab.linkUrl}`}>{tab.label}</Link>
            </Tab>
          ))
        }
      </Tabs>
    </Container>
  );
}

export default TopNavigationBar;
