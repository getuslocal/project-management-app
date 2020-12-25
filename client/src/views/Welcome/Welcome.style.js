import styled from 'styled-components';
import { color, zIndexValues } from '../../shared/utils/styles';

export const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: ${color.white};
  top: 0;
  left: 0;
  z-index: ${zIndexValues.modal};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  min-height: 500px;
  width: 620px;
  padding: 0 10px;
  text-align: left;

  h1 {
    font-size: 30px;
    margin-bottom: 16px;
  }

  h2 {
    font-weight: 500;
    font-size: 20px;
  }

  & > form {
    & > div {
      margin: 30px 0;

      .warning-message {
        display: none;
      }
    }
  }
`;

export const DemoContent = styled.div`
  background-color: #eef5f9;
  border: 1px solid #b3daf0;
  padding: 7px;
  border-radius: 3px;

  & > h3 {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 8px;
  }

  .drop-down-menu-content {
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

export const MenuOption = styled.div`
  font-size: 14px;

  & > span {
    color: ${color.textMedium};
    font-size: 12px;
  }
`;
