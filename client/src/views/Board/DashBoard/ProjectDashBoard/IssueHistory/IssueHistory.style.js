import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const Container = styled.div`
  height: 100%;
  max-height : 100%;
  overflow-y : scroll;

  /* The emerging W3C standard
   that is currently Firefox-only */
    scrollbar-width: thin;
    scrollbar-color: blue orange;

  /* Works on Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${color.borderLightest};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${color.textDark};
}
`;
export const ListContainer = styled.ul`
position: relative;

  &:before{
    left: 125px;
    height: 100%;
    content: "";
    position: absolute;
    border-left: 2px solid ${color.primary};    
  }
`;

export const SectionContainer = styled.div`
  box-shadow: 0 1px 4px 2px rgba(15, 53, 169, .1);
  border-radius: 5px;
  width: ${(props) => props.width ? props.width : 'auto'};
  `;

export const SectionContent = styled.div`
  padding: 10px;
  height: ${(props) => props.height ? props.height : 'auto'};
`;

export const List = styled.li`
  display: flex;
  width: 100%;
  margin: 20px 0;
  padding: 5px 10px 5px 0;
`;

export const IconCont = styled.div`
  margin-right: 10px;
`;

export const MainContent = styled.div`
  font-size: 13.5px;
`;

export const EditorName = styled.span`
  color: #3b73af;
  font-weight: 600;
`;

export const Bold = styled.span`
  font-weight: 700;
`;

export const Date = styled.span`
  color: rgb(94, 108, 132);
  font-weight: 500;
  font-size: 11px;
  display: inline-block;
  text-align: right;
  width: 100%;
  margin-top: 10px;
`;
export const CircleMark = styled.span`
  top: 10px;
  left: 119px;
  width: 14px;
  border: 3px solid ${color.primary};
  height: 14px;
  position: absolute;
  background: #fff;
  border-radius: 50%;
`;

export const Top = styled.p`
  margin-bottom: 7px;

  & > i {
    vertical-align: middle;
  }
`;
export const Left = styled.div`
  min-width: 110px;
  position: relative;
  margin-right: 30px;
`;
export const Right = styled.div`
  display: flex;
`;

export const Bottom = styled.p`
  display: flex;
  align-items: center;

  & > i {
    margin-right: 7px;
  }

`;
export const Comment = styled.span`
  color: #3b73af;
  font-weight: 500;
  font-size: 11px;
`;
export const Result = styled.p`
  font-weight: 500;
  font-size: 11px;
  text-align: right;
  color: ${color.textMedium};
  position: absolute;
  bottom: 15px;
  right: 15px;
`;
