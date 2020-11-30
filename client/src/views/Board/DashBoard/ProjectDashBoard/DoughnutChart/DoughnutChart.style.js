import styled from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Container = styled.div`
  height: calc( 100% - 52px );
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 0 10px 10px;
`;

export const Left = styled.div`
  width: 60%;
  height: 300px;
  position: relative;
`;

export const Right = styled.div`
  width: 40%;
  padding-left: 16px;
  top: -8px;
  max-height: 390px;
  overflow-y: auto;
`;

export const InnerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  color: ${color.textDark};
`;

export const IssueCount = styled.div`
  font-size: 34px;
  color: ${color.textDarkest};
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Detail = styled.div`
  &:not(:last-child){
    margin-bottom: 24px;
  }
`;

export const DetailTop = styled.div`
  margin-bottom: 14px;
  font-size: 14px;
  color: ${color.textDarkest};
  font-weight: 600;
  display: flex;
`;

export const ColorBox = styled.span`
  height: 14px;
  min-width: 14px;
  width: 14px;
  display: block;
  margin-right: 5px;
`;

export const CompletionText = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 14px;
  color: ${color.textMedium};
`