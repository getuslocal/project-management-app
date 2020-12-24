import styled from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Block = styled.div`
  box-shadow: 0 1px 4px 2px rgba(15, 53, 169, .1);
  border-radius: 5px;
  padding: 20px;
  width: 50%;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  height: calc(50% - 10px);

  &:first-child{
    margin-bottom: 20px;
  }
`;

export const IconContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  
  & > i {
    line-height: 50px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
`;

export const BlockContent = styled.div`
  text-align: center;
`;

export const Number = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const BlockTitle = styled.p`
  font-weight: 500;
  font-size: 17px;
  color: ${color.textMedium};
`;