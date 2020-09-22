import styled, { css } from 'styled-components'

export const Blanket = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
`

export const InnerWrapper = styled.div`
  padding: 0 30px;
  min-height: 500px;
`

export const TopFixedContent = styled.div`
 text-align: right;
  i{
    font-size: 20px;
    cursor: pointer;
    color: rgb(66, 82, 110);
    &:not(:last-child) {
      margin-right: 25px;
    }
  }

  padding: 20px 30px;
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
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
  text-align: right;
  padding: 20px 30px;
`

export const SubmitButton = styled.input`
  font-weight: 600;
  background-color: rgb(0, 82, 204);
  border-radius: 3px;
  color: #fff;
  padding: .6em;
  font-size: 14px;
  font-weight: 500;
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
  padding-right: 50px;
`

export const FormRightContent = styled.div`
  width: 35%;
`

export const TicketHistoryContent = styled.div`
  margin-top: 1em;
  p {
    color: rgb(107, 119, 140);
    white-space: nowrap;
    font-size: 12px;
    &:not(:last-child) {
      margin-bottom: .5em;
    }
  }
`

export const CompleteButton = styled.button`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 8px;
  border: 1px solid #5e6c84;
  color: #5e6c84;
  border-radius: 3px;

  &::before {
    font-size: 11px;
    margin-right: 5px;
  }

  &:hover {
    ${({isEpicDone}) => !isEpicDone && css`
      background-color: #091e420d;
    `}
  }

  ${({isEpicDone}) => isEpicDone && css`
    background-color: rgb(227,252,239);
    color: rgb(0,102,68) !important;
    border-color: transparent; 
    &:hover {
      background-color: rgb(227,252,239);
    }
  `}
`
