import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  TopNavigationSmallContent,
  Organization,
  QuestionButton,
  TopNavigationMain,
  BoardTitleContainer,
  BoardTitle,
  ArrowNavigation,
  SearchBox,
  TopNavigationTabs,
  Tab,
} from './TopNavigationBar.style'

const TopNavigationBar = ({ title, tabs, baseUrl, currentRoute }) => {
  // console.log(currentRoute)
  return (
    <>
      <TopNavigationSmallContent>
        <Organization>
          <p>Your organization is : <span><i className="far fa-building"></i> TakayaHoldings.Inc</span></p>
        </Organization>
        <QuestionButton><i className="fas fa-question-circle"></i></QuestionButton>
      </TopNavigationSmallContent>

      <TopNavigationMain>
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
      </TopNavigationMain>

      <TopNavigationTabs>
        {
          tabs.map((tab, index) => (
            <Tab key={index} className={currentRoute === tab.linkUrl.replace('/', '') ? 'active' : ''} >
              <Link to={`${baseUrl}${tab.linkUrl}`}>{tab.label}</Link>
            </Tab> //@todo : how to add class 'active' ?
          ))
        }
      </TopNavigationTabs>
    </>
  );
}

export default TopNavigationBar;
