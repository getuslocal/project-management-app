import styled from 'styled-components'

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

export const FormContent = styled.div`
        width: 100%;
`

export const FormContentWithIcon = styled.div`
        width: ${props => (props.width ? props.width: '100%')};
        min-width: 250px;
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

        input {
          padding-left: 30px;
          padding-right: 30px;
        }
`

export const Input = styled.input`
        border-radius: 3px;
        width: 100%;
        background-color: rgb(250, 251, 252);
        border: 1px solid #dfe1e6;
        padding: 4px 7px 5px;
        color: #172b4d;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        line-height: 20px;
        width: ${props => (props.width ? props.width: '100%')};
        &:hover {
          background-color: rgba(9, 30, 66, 0.05);
        }
`

export const TextArea = styled.textarea`
        border-radius: 3px;
        width: 100%;
        background-color: rgb(250, 251, 252);
        border: 1px solid #dfe1e6;
        padding: 4px 7px 5px;
        color: #172b4d;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        line-height: 20px;
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