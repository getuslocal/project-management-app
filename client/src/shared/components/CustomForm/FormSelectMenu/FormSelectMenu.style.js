import styled, { css } from 'styled-components'

// Custom themes for FormInput and FormTextArea components.
const issueDescriptionTheme = css`
  border: 2px solid transparent;
  
  label{
    font-size: 14px;
    font-weight: 600;
  }
  
  textarea {
    font-size: 15px;
    border: 1px solid transparent;

    &:focus{
      border: 1px solid rgb(223, 225, 230);
      background-color: #fff;
    }
  }
`;

const issueSummaryTheme = css`
  input {
    border: 2px solid transparent;
    font-size: 24px;
    &:focus{
      border: 2px solid rgb(76, 154, 255);
      background-color: #fff;
    }
  }
`;

export const OuterWrapper = styled.div`
  width: ${props => (props.width ? props.width : '100%')};
  position: relative;
`

export const FormWrapper = styled.div`
  min-height: ${props => (props.height ? props.height : 'auto')};
  display: flex;
  align-items: center;
  padding: 0.3125em .5em;
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