import styled , {css} from 'styled-components'

export const FormContainer = styled.div`
    margin: 20px 0;
`

export const Label = styled.label`
        display: block;
        color: #5e6c84;
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 2px;
`

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

export const FormContent = styled.div`
        width: 100%;

        &.theme-textarea-issueDescription {
          ${issueDescriptionTheme}
        }

        &.theme-input-issueSummary {
          ${issueSummaryTheme}
        }
`

// Custom theme for FormSelectMenu component.
const issueStatusTheme = css`
  input {
    background-color: #dfe1e6;
    cursor: pointer;
    font-weight: 600;
    &:hover{
      background-color: rgb(193, 199, 208);
    }
  }
`;

export const FormContentWithIcon = styled.div`
        width: ${props => (props.width ? props.width : '100%')};
        position: relative;
        &:before {
          position: absolute;
          left: 10px;
          top: 9px;
        }
        
        &:after {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 14px;
          
          &:hover {
            cursor: pointer;
          }
        }

        &.theme-issueStatus {
          ${issueStatusTheme}
        }
        `

export const Input = styled.input`
        border-radius: 3px;
        width: 100%;
        font-size: 14px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: ${props => (!props.hasIcon ? '10px' : '30px')};
        padding-right: ${props => (!props.hasIcon ? '10px' : '30px')};
        color: #172b4d;
        font-weight: 400;
        font-style: normal;
        line-height: 20px;
        width: ${props => (props.width ? props.width : '100%')};
        border: ${props => (props.backgroundStyle === "transparent" ? 'none' : '1px solid #dfe1e6')};
        background-color: ${props => (props.backgroundStyle === "transparent" ? 'unset' : 'rgb(250, 251, 252)')};

        &:hover {
          background-color: rgba(9, 30, 66, 0.05);
        }
`

export const TextArea = styled.textarea`
        border-radius: 3px;
        padding: 4px 7px 5px;
        color: #172b4d;
        font-weight: 400;
        font-size: 14px;
        font-style: normal;
        line-height: 20px;
        border: ${props => (props.backgroundStyle === "transparent" ? 'none' : '1px solid #dfe1e6')};
        background-color: ${props => (props.backgroundStyle === "transparent" ? 'unset' : 'rgb(250, 251, 252)')};
        width: ${props => (props.width ? props.width : '100%')};

        &:hover {
          background-color: rgba(9, 30, 66, 0.05);
        }

`

export const Description = styled.p`
        font-weight: 400;
        line-height: 20px;
        font-size: 11px;
        color: #6c798f;
`