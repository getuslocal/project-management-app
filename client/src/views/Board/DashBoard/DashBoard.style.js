import styled, { css } from 'styled-components'

export const Container = styled.div`

`;

export const SectionContainer = styled.div`
  box-shadow: 0 1px 4px 2px rgba(15, 53, 169, .1);
  border-radius: 5px;
  width: ${(props) => props.width ? props.width : 'auto'};
  /* border-top: 5px solid #0f35a9; */
  `;

export const SectionContent = styled.div`
  padding: 10px;
  min-height: ${(props) => props.height ? props.height : 'auto'};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
`;

export const SectionTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  padding: 20px 20px 0;
`;
