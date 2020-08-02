import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, fontSize } from '../../shared/utils/styles';
import StyledButton from '../../shared/components/Button/CustomLinkButton/CustomLinkButton';

export const LandingContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const LandingLeftContent = styled.div`
  width: 45%;
  text-align:center;
  padding-top: 5em;
  position: relative;
`;

export const LandingRightContent = styled.div`
  width: 55%;
  height: 100vh;
  background-image: 
  /* linear-gradient(
    rgba(0,0,0, .05),
    rgba(0,0,0, .05)
  ), */
  url('https://images.unsplash.com/photo-1521571086300-579bd981bbb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5em 5em 0;
    color: ${color.white};
  `;


export const LogoContainer = styled.p`
    margin-bottom:6em;
  `;


export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  `;

export const LandingMainHeading = styled.h1`
font-size: 3em;
font-weight: 500;
`

export const LandingSubHeading = styled.h2`
font-size: 2em;
font-weight: 500;
`
export const OptionsContainer = styled.div`
position: absolute;
bottom: 0;
width: 100%;
border-bottom: 1px solid transparent;
border-top: 2px solid ${color.smokewhite};
 `
