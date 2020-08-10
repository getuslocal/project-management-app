import React from 'react';
import { Link } from 'react-router-dom';
import {
  LogoContainer,
  CircleLeftIcon,
  SidebarList,
  SignoutButton,
  SidebarContainer,
  UserIconWrapper,
  UserProfile,
  Usericon,
  UserProfileSummary,
  UserProfileParagraph,
  SortDownIcon,
} from './Sidebar.style';
import Logo from '../../../assets/logo.svg';
import store from '../../../redux/store';
import { logout } from '../../../redux/auth/auth.actions';

const Sidebar = ({ user, roleComponents, match }) => {
  const { name, role } = user;
  return (
    <SidebarContainer>
      <LogoContainer>
        <img src={Logo} width='40px' height='40px' />
        <CircleLeftIcon className="fas fa-arrow-circle-left" />
      </LogoContainer>
      <UserProfile>
        <UserIconWrapper>
          <Usericon src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_960_720.jpg" />
        </UserIconWrapper>
        <UserProfileSummary>
          {/* <i className="far fa-edit"></i> */}
          <UserProfileParagraph className="bold">{name}</UserProfileParagraph>
          <UserProfileParagraph>{role}</UserProfileParagraph>
        </UserProfileSummary>
      </UserProfile>
      <nav>
        <ul>
          {
            roleComponents.map(({ id, linkUrl, icon, title, hasSubMenu }) => (
              <SidebarList key={id}>
                <Link
                  to={`${match.path}${linkUrl}`}
                  className={icon}>{title}</Link>
                {hasSubMenu ? <SortDownIcon className="fas fa-sort-down" /> : ''}
              </SidebarList>
            ))
          }
          {/* <li className="sublist">
                    <ul>
                        <li>Project Management App</li>
                        <li>Shopping App</li>
                        <li>COMP 3521</li>
                    </ul>
                </li> */}
        </ul>
      </nav>
      <SignoutButton onClick={() => store.dispatch(logout())}>
        <i className="fas fa-sign-out-alt" style={{ marginRight: '.5em' }}></i>
                Sign out
            </SignoutButton>
    </SidebarContainer>
  );
}


export default Sidebar;
