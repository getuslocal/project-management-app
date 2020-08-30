import styled from 'styled-components';

export const SidebarContainer = styled.div`
  float: left;
  background-color: #0f35a9;
  width: 230px;
  color: #fff;
  height: 100%;
  padding: 2em 0;
  position: relative;
  `;

export const LogoContainer = styled.p`
    margin-bottom: 3.5em;
    padding: 0 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CircleLeftIcon = styled.i`
  font-size: 1.5em;

  &:hover {
    color: #8CD7F8;
    cursor: pointer;
  }
  `;

export const UserProfile = styled.div`
    display: flex;
    align-items: center;
    margin: 0 1em 1.5em;
    position: relative;
`
export const UserIconWrapper = styled.div`
      background: rgba(255, 255, 255, 0.5);
      width: 3em;
      height: 3em;
      border-radius: 50%;
      padding: 1px;
      margin-right: 12px;
`
export const Usericon = styled.img`
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
`

export const UserProfileSummary = styled.div`
  .fa-edit {
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 0;

    &:hover {
      color: #8CD7F8;
      cursor: pointer;
    }
  }
`

export const UserProfileParagraph = styled.p`
  font-size: 10px;

  &.bold {
    font-size: 14px;
    font-weight: 600;
  }
`

export const SignoutButton = styled.p`
    position: absolute;
    bottom: 5%;
    left: 1em;

    i {
      color: rgba(255, 255, 255, 0.4);
    }

    &:hover {
      color: #8CD7F8;
      cursor: pointer;
    }
  `;