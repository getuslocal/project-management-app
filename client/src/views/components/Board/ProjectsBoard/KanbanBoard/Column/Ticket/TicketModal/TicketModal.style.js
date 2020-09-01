import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: absolute;
    height: 100%;
    left: 0;
    width: 100%;
    top: 0;
`
export const Blanket = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(23, 43, 77, .5);
`

export const MainContent = styled.div`
    background-color: #fff;
    position: relative;
    z-index: 9999;
    min-width: 800px;
    width: 70%;
    max-width: 1040px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    border-radius: 3px;
    padding: 2rem;
    height: 600px;
    max-height: 600px;

    `
export const TopFixedContent = styled.div`
 text-align: right;
  i{
    font-size: 20px;
    cursor: pointer;
    color: rgb(66, 82, 110);
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
`
export const TicketKey = styled.span`
  float: left;
  font-size: 14px;
  color: rgb(94, 108, 132);
  &:before{
    margin-right: 1em;
    position: relative;
    top: -1.5px;
  }
`
export const Title = styled.p`
      font-size: 19px;
      line-height: 1.5;
      font-weight: 500;
      margin-bottom: 1.5em;
`
export const ButtonsContainer = styled.div`
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: right;
      padding: 16px 24px;
`
export const SubmitButton = styled.input`
        font-weight: 600;
        background-color: rgb(0, 82, 204);
        border-radius: 3px;
        color: #fff;
        padding: .6em;
        font-size: 14px;
        font-weight: 500;
        margin-right: 1.5em;
        border: none;

        &:hover {
          opacity: .9;
          cursor: pointer;
        }
`

export const FormContainer = styled.div`
  display: flex;
`
export const FormLeftContent = styled.div`
  width: 65%;
`

export const FormRightContent = styled.div`
  width: 35%;
`

export const TicketHistoryContent = styled.div`
  margin-top: 1em;
  p{
    color: rgb(107, 119, 140);
    white-space: nowrap;
    font-size: 12px;
    &:not(:last-child) {
      margin-bottom: .5em;
    }
  }
`

export const Fieldset = styled.fieldset`
          border: none;
          padding: 0;
`
export const Diviser = styled.div`
border-bottom: 1px solid #ddd;
`
