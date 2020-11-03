import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  SidebarList,
  SidebarSubList
} from './LinkList.style'

const LinkList = ({ id, linkUrl, icon, title, dropDownMenu, match }) => {
  // console.log(match.params.board)
  const [isVisible, setIsVisible] = useState(false);
  const { board } = match.params;
  const isActive = board === linkUrl ? 'active' : '';

  return (
    <>
      <SidebarList key={id} onClick={() => setIsVisible(!isVisible)} className={`${isActive ? 'active' : ''} ${isVisible ? 'open-sub-list' : ''}`}>
        {
          dropDownMenu.length > 0 ?
            <span className={`${icon} icon-sort-down`}>{title}</span>
            :
            (
              <Link to={`/app/${linkUrl}`} className={icon}>
                {title}
              </Link>
            )
        }
        {
          dropDownMenu.length > 0 && (
            <SidebarSubList className={isVisible ? 'visible' : ''}>
              {dropDownMenu.map((menu, index) => (
                <li key={index}><Link to={`/app/${linkUrl}${menu.linkUrl}`}> {menu.label}</Link></li>
              ))}
            </SidebarSubList>
          )}
      </SidebarList>
    </>
  );
}

export default withRouter(LinkList);
