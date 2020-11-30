import React from 'react';
import {
  Logo,
  ResizeButton,
  Top,
  MainContent,
  EditButton,
  LogoutButton,
  Container,
  UserIcon,
  UserProfile,
  UserProfileOverview,
  Blanket,
} from './Sidebar.style';
import store from '../../redux/store';
import { logout } from '../../redux/auth/auth.actions';
import LinkList from './LinkList/LinkList';
import Icon from '../../shared/components/Icon/Icon';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive'

const QUERY_LARGE = "(max-width:1250px)"

const Sidebar = ({
  user: { name, role, pictureUrl },
  roles,
  secondaryView,
  setSecondaryView
}) => {

  const isSmallView = useMediaQuery({ query: QUERY_LARGE });

  // If small view and secondary sidebar, disable scrolling 
  // while a modal is active.
  if (isSmallView && secondaryView) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.removeProperty('overflow');
  }

  return (
    <Fragment>
      <Blanket onClick={setSecondaryView} className="side-bar-blanket" isActive={secondaryView} ></Blanket>
      <Container className={secondaryView ? 'secondary-side-bar' : 'default-side-bar'}>
        <Top className="side-bar-top">
          <Logo className="side-bar-logo">
            <Icon type="cube" imageUrl={pictureUrl} size={30} isSolid={true} />
            <span>Simplanner</span>
          </Logo>
          <ResizeButton className="resize-button">
            <Icon onClick={setSecondaryView} type="circle-left" size={22} isSolid={true} />
          </ResizeButton>
        </Top>
        <MainContent className="side-bar-main">
          <UserProfile>
            <EditButton>
              <Icon type="pen" size={11} isSolid={true} />
            </EditButton>
            <UserIcon>
              <Icon type="user-icon" imageUrl={pictureUrl} size={47} />
            </UserIcon>
            <UserProfileOverview>
              <p className="profile-name">{name}</p>
              <p className="profile-role">{role}</p>
            </UserProfileOverview>
          </UserProfile>
          <nav>
            <ul>
              {
                Object.values(roles).map(component => (
                  <LinkList
                    key={component.id}
                    {...component}
                    closeModal={() => {
                      if (isSmallView && secondaryView) {
                        setSecondaryView()
                      }
                    }}
                  />
                ))
              }
            </ul>
          </nav>
        </MainContent>
        <LogoutButton
          className="side-bar-logout"
          onClick={() => store.dispatch(logout())}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </LogoutButton>
      </Container>
    </Fragment>
  )
}


export default Sidebar;
