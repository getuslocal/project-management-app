import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../shared/components/Icon/Icon';
import SearchResults from './SearchResults/SearchResults';
import useOutsideClick from "../../shared/hooks/useOutsideClick";
import {
  Container,
  Content,
  BoardTitle,
  SearchBox,
  Tabs,
  Tab,
} from './TopNavigationBar.style'

const TopNavigationBar = ({ title, tabs, baseUrl, currentTab }) => {
  const [search, setSearch] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchBoxRef = useRef();

  useOutsideClick(searchBoxRef, () => {
    if (search.length > 0) {
      setIsSearchActive(false);
      setSearch('');
    }
  });

  return (
    <Container>
      <Content>
        <BoardTitle>{title}</BoardTitle>
        <SearchBox ref={searchBoxRef} onClick={() => setIsSearchActive(true)}>
          <Icon type="search" size={14} isSolid={true} />
          <input type="text" placeholder="Search issues" value={search} onChange={e => setSearch(e.target.value)} />
          <SearchResults search={search} isSearchActive={isSearchActive} />
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
