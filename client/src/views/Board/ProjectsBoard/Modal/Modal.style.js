import styled, { css } from 'styled-components';

export const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  overflow: hidden auto;
`;

export const Container = styled.div`
  background-color: rgba(23, 43, 77, 0.5);
  min-height: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 50px;
`;

export const Content = styled.div`
  vertical-align: middle;
  display: inline-block;
  background-color: #fff;
  position: relative;
  z-index: 200;
  min-width: 500px;
  width: 100%;
  max-width: 800px;
  border-radius: 3px;
`;

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
`;

export const Diviser = styled.div`
  border-bottom: 1px solid #ddd;
`;
