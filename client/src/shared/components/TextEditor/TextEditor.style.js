import styled from 'styled-components';
import { color, font } from '../../../shared/utils/styles';

export const QuillContainer = styled.div`
  .ql-toolbar.ql-snow {
    border-radius: 4px 4px 0 0;
    border: 1px solid ${color.borderLightest};
    border-bottom: none;
  }
  .ql-container.ql-snow {
    border-radius: 0 0 4px 4px;
    border: 1px solid ${color.borderLightest};
    border-top: none;
    color: ${color.textDarkest};
    font-size: 14px;
    ${font.regular}
  }
  .ql-editor {
    min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : '110px')};
    line-height: 1.8;
  }
`;
