import styled from 'styled-components';
import { color } from '../../../shared/utils/styles';

export const LoginContainer = styled.div`
  padding:0 1.5em;
  max-width: 400px;
  margin: 0 auto;
`;

export const FormTitle = styled.h2`
  margin-bottom: 2.5em;
  font-weight:600;
  font-size:18px;
`;

export const GrayText = styled.span`
  color: ${color.textVeryLight};
  font-weight: 500;
`;
