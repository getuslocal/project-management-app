import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, fontSize, padding } from '../../shared/utils/styles';
import LandingBg from './assets/landing-bg.png'

export const LandingContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 950px;
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
  height: 100%;
  background-image: 
  linear-gradient(
    rgba(0,0,0, .2),
    rgba(0,0,0, .2)
  ),
  url(${LandingBg});
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

export const SubmitButton = styled.input`
  display: inline-block;
  background: ${color.primary};
  line-height: 1;
  padding: ${padding.med} ${padding.double};
  border: 0;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  color: ${color.white};
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 5px blue;
  top: 0;

  &:active {
    position: relative;
    outline: none;
    top: 5px;
    box-shadow: none;
  }
`;