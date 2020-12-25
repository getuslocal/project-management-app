import styled from 'styled-components';
import { color, zIndexValues } from '../../utils/styles';

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

export const Blanket = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
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

export const Wrapper = styled.div`
  vertical-align: middle;
  display: inline-block;
  background-color: ${color.white};
  position: relative;
  z-index: ${zIndexValues.modal};
  border-radius: 3px;
`;

export const Content = styled.div`
  padding: 20px 30px;
  min-width: ${(props) => props.modalWidth}px;
  width: ${(props) => props.modalWidth}px;
`;

export const Title = styled.p`
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Options = styled.div`
  text-align: right;
  & > button {
    &:first-child {
      margin-right: 10px;
    }
  }
`;
