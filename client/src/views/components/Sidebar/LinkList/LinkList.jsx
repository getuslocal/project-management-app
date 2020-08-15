import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  SidebarList,
  SidebarSubList
} from './LinkList.style'

const LinkList = ({ id, linkUrl, icon, title, hasSubMenu, match }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { board } = match.params;
  const isActive = (!board && !linkUrl) ? ('active') : (board === linkUrl.substr(1) ? 'active' : '');

  return (
    <>
      <SidebarList key={id} onClick={() => setIsVisible(!isVisible)} className={`${isActive ? 'active' : ''} ${isVisible ? 'open-sub-list' : ''}`}>
        {
          hasSubMenu ?
            <span className={`${icon} ${hasSubMenu ? 'icon-sort-down' : ''}`}>{title}</span>
            :
            (
              <Link to={`/app${linkUrl}`} className={`${icon} ${hasSubMenu ? 'icon-sort-down' : ''}`}>
                {title}
              </Link>
            )
        }
        {
          hasSubMenu ? (
            <SidebarSubList className={isVisible ? 'visible' : ''}>
              {hasSubMenu.map((menu, index) => (
                <li key={index}><Link to={`/app${linkUrl}/${menu.linkUrl}`}> {menu.label}</Link></li>
              ))}
            </SidebarSubList>
          ) : ''}
      </SidebarList>
    </>
  );
}

export default withRouter(LinkList);
