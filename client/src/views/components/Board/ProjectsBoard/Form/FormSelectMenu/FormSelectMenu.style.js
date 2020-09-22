import styled, { css } from 'styled-components'

export const OuterWrapper = styled.div`
  width: ${props => (props.width ? props.width : '100%')};
  position: relative;
`

export const FormWrapper = styled.div`
  min-height: ${props => (props.height ? props.height : 'auto')};
  display: flex;
  align-items: center;
  padding: 5px 8px;
  padding-right: 25px;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);

  /* Add arrow down icon */
  &:after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: '\f107';
    position: absolute;
    right: 10px;
    font-size: 14px;
  }

  &:hover {
    background-color: #091e420d;
    input,
    textarea {
      background-color: #091e4200;
    }
  }

  /* Transparent background */
  ${({ isTransparentBackground }) => isTransparentBackground && css`
    border : none;
    background-color: unset;
    input,
    textarea {
      background-color: unset;
    }
  `}
`

const CommonFormStyle = css`
  font-size: 14px;
  font-weight: 400;
  color: #172b4d;
  font-style: normal;
  line-height: 20px;
  padding : 0;
  border : none;
  background-color: rgb(250, 251, 252);
`

export const Input = styled.input`
  ${CommonFormStyle}
  width: ${props => (props.width ? props.width : '100%')};
`

export const TextArea = styled.textarea`
  ${CommonFormStyle}
  width: ${props => (props.width ? props.width : '100%')};
`