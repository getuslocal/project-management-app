import styled, { css } from 'styled-components'

export const Container = styled.div`
  max-height : 370px;
  overflow-y : scroll;
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
  /* border-bottom: 1px solid #dfe1e6; */
  padding: 5px;
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
  margin: 0 10px;
  color: rgb(94, 108, 132);
  font-weight: 500;
  font-size: 11px;
`;

export const Top = styled.p`
  margin-bottom: 7px;
`;

export const Bottom = styled.p`
  display: flex;
  align-items: center;
`;
export const Comment = styled.span`
  color: #3b73af;
  font-weight: 500;
  font-size: 11px;
`;
