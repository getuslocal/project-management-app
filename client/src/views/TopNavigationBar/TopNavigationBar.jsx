import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../shared/components/Icon/Icon';
import {
  Container,
  Content,
  BoardTitle,
  SearchBox,
  Tabs,
  Tab,
} from './TopNavigationBar.style'

const TopNavigationBar = ({ title, tabs, baseUrl, currentTab }) => {
  return (
    <Container>
      <Content>
        <BoardTitle>{title}</BoardTitle>
        <SearchBox>
          <Icon type="search" size={14} isSolid={true} />
          <input type="text" placeholder="Search issues" />
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
