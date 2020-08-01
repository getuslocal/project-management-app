import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LandingContainer = styled.div`
  width: 100%;
`;

export const LandingLeftContent = styled.div`
  width: 40%;
  text-align:center;
  padding-top: 5em;
`;

export const LandingRightContent = styled.div`
  width: 60%;
  background-color: pink;
`;

export const LogoContainer = styled.p`
  height: 100%;
  margin-bottom:6em;
`;

export const OptionsContainer = styled.div`

`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

