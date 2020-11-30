import styled, { css } from 'styled-components';
import { media } from '../../shared/utils/global';
import Button from '../../shared/components/Button/Button';
import { color, zIndexValues } from '../../shared/utils/styles';

const smallView = css`
  width: 40px;

  .side-bar-top {
    padding-left: 0;
    padding-right: 0;
    text-align: center;
    display: block;
  }

  .side-bar-main,
  .side-bar-logo,
  .side-bar-logout>span{
    display: none;
  }
  
  .side-bar-logout {
    & > i {
      margin-right: 0
    }
  }

  .resize-button{
    & > i {
      &::before{
        content: '\f138';
      }
    }
  }
`

export const Container = styled.div`
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${zIndexValues.navLeft};
  overflow: hidden;
  background-color: #0f35a9;
  transition: all .3s;
  height: 100%;
  width: 220px;
  transition: all .3s;
  color: #fff;

  ${media.large`
    &.default-side-bar{
      ${smallView};
    }
  `};

  @media (min-width: 1251px) {
    &.secondary-side-bar{
      ${smallView};
    }
  }
`;

export const Blanket = styled.div`
  background-color: rgba(23, 43, 77, .5);
  height: 100%;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 50;
  display: none;

  ${media.large`
    display: ${props => props.isActive ? 'block' : 'none'};
  `};
`

export const Top = styled.div`
  text-align: right;
  padding: 20px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.p`
  display: flex;
  align-items: center;

  & > i {
    margin-right: 7px;
    color: ${color.lightBlue};
  }

  & > span {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const ResizeButton = styled.button`
  padding: 0;
  cursor: pointer;
  color: ${color.white};

  & > i {
    &:hover{
      color: ${color.lightBlue};
    }
  }
`

export const MainContent = styled.div`
    display: block;
    min-width: 220px;
`;

export const UserProfile = styled.div`
  align-items: center;
  padding: 14px 12px;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

export const EditButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0;
  cursor: pointer;

  & > i {
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background-color: ${color.white};
    color: ${color.primary};
    border-radius: 50%;
    
    &:hover{
      background-color: ${color.lightBlue};
    }
  }
`

export const UserIcon = styled.div`
  text-align: center;
  margin-bottom: 5px;

  & > i {
    &:before{
      border: 2px solid rgba(255, 255, 255, 0.9);
    }
  }
`

export const UserProfileOverview = styled.div`
  text-align: center;

  .profile-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .profile-role {
    font-size: 12px;
    display: inline-block;
    color: ${color.white};
    background-color: #00b1ff;
    border-radius: 3px;
    line-height: 1;
    padding: 3px 6px;
    font-weight: 600;
  }
`

export const LogoutButton = styled(Button)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  padding: 10px 24px;
  color: ${color.textDarkest};
  min-width: 120px;

  & > i {
    margin-right: 8px;
    color: ${color.textDarkest};
  }

  &:hover {
    background-color: ${color.lightBlue};
  }
`;