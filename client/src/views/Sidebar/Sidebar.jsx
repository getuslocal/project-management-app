import React from 'react';
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
} from './Sidebar.style';
import Logo from '../../assets/logo.svg';
import store from '../../redux/store';
import { logout } from '../../redux/auth/auth.actions';
import LinkList from './LinkList/LinkList';

const Sidebar = ({ user: { name, role, pictureUrl }, roles }) => (
  <SidebarContainer>
    <LogoContainer>
      <img src={Logo} width='40px' height='40px' />
      <CircleLeftIcon className="fas fa-arrow-circle-left" />
    </LogoContainer>
    <UserProfile>
      <UserIconWrapper>
        <Usericon src={pictureUrl} />
      </UserIconWrapper>
      <UserProfileSummary>
        <UserProfileParagraph className="bold">{name}</UserProfileParagraph>
        <UserProfileParagraph>{role}</UserProfileParagraph>
      </UserProfileSummary>
    </UserProfile>
    <nav>
      <ul>
        {
          roles.map(component => (
            <LinkList key={component.id} {...component} />
          ))
        }
      </ul>
    </nav>
    <SignoutButton onClick={() => store.dispatch(logout())}>
      <i className="fas fa-sign-out-alt" style={{ marginRight: '.5em' }}></i>
        Sign out</SignoutButton>
  </SidebarContainer>
);


export default Sidebar;
