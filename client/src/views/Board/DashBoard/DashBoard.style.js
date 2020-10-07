import styled, { css } from 'styled-components'

export const Container = styled.div`

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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
`;

export const SectionTitle = styled.p`
  font-weight: 600;
  font-size: 17px;
  border-bottom: 1px solid #dfe1e6;
  padding: 15px;
`;
