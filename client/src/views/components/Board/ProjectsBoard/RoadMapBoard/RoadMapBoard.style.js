import styled, {css} from 'styled-components';

export const Container = styled.div`
`

export const MainContent = styled.div`
  width: 100%;
  min-width: 1000px;
  margin-top: ${(props) => props.isNavigationVisible == false && props.fixedContentHeight}px;
`

export const FixedContent = styled.div`
  /* padding: 1px 0; */
  position: static;

    ${(props) =>
      props.isNavigationVisible == false &&
      css`
      position: fixed;
      padding-left: 3em;
      padding-right: 3em;
      top: 0;
      right: 0;
      left: 230px;
      width: calc(100% - 230px);
      z-index: 200;
      background-color: #fff;
    `};
`