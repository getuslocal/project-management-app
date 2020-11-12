import styled from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Container = styled.div`
  height: calc( 100% - 52px );
  display: flex;
  align-items: center;
  justify-content:space-around;
  padding: 0 20px;
`;

export const Left = styled.div`
  width: 280px;
  height: 280px;
  position: relative;
`;

export const Right = styled.div`
  width: 45%;
  padding: 0 20px 0 40px;
  position: relative;
  top: -8px;
`;

export const InnerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  color: ${color.textDark};
`;

export const IssueCount = styled.div`
  font-size: 36px;
  color: ${color.textDarkest};
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Detail = styled.div`
  &:not(:last-child){
    margin-bottom: 40px;
  }
`;

export const DetailTop = styled.div`
  margin-bottom: 14px;
  font-size: 14px;
  color: ${color.textDarkest};
  font-weight: 600;
`;

export const Status = styled.span`
  float: right;
  color: ${color.textMedium};
  font-size: 14px;
  font-weight: 500;

  & > span {
  font-weight: 600;
  color: ${color.textDarkest};
  }
`;