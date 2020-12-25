import styled from 'styled-components';
import { color } from '../../../../../../../shared/utils/styles';

export const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${color.textDarkest};
  margin-bottom: 10px;
`;

export const OrderedLists = styled.ol`
  list-style-position: inside;

  & > li {
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

export const NestedLists = styled.ul`
  padding: 5px 10px;
  list-style: disc;
  list-style-position: inside;

  & > li {
    font-size: 12px;
    line-height: 1.8;
    color: ${color.textMedium};

    & > em {
      font-weight: 600;
      color: ${color.textDark};
    }
  }
`;
