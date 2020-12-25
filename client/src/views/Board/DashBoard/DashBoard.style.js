import styled, { css } from 'styled-components';
import { color } from '../../../shared/utils/styles';

export const Container = styled.div``;

export const SectionContainer = styled.div`
  box-shadow: ${(props) =>
    props.noBoxShadow ? 'unset' : '0 1px 4px 2px rgba(15, 53, 169, .1)'};
  border-radius: 5px;
  width: ${(props) => (props.width ? props.width : 'auto')};
  /* border-top: 5px solid #0f35a9; */
`;

export const SectionContent = styled.div`
  /* height: calc(100% - 42px); */
  padding: 10px;
  height: ${(props) => (props.height ? props.height : 'auto')};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0;

  &:first-child {
    margin: 20px 0 30px;
  }
`;

export const SectionTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  padding: 20px 20px 10px;
`;

export const TitleDescription = styled.span`
  font-size: 12px;
  color: ${color.textMedium};
  font-weight: 500;
  float: right;
`;
