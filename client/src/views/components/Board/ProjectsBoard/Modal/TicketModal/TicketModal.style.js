import styled from 'styled-components'

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
  padding: 0 30px 30px;
  min-height: 500px;
`

export const TopFixedContent = styled.div`
  padding: 20px 30px;
  display:flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`

export const TopContentRight = styled.div`

    i{
      font-size: 20px;
      cursor: pointer;
      color: rgb(66, 82, 110);
      &:not(:last-child) {
        margin-right: 25px;
      }
    }
`
export const TopContentLeft = styled.div`
  font-weight: 500;
  display: flex;
  align-content: center;
`

export const Slash = styled.span`
  color: rgb(94, 108, 132);
  font-size: 12px;
`

export const TicketKey = styled.span`
  font-size: 14px;
  color: rgb(94, 108, 132);
  line-height: 1;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
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
  width: 68%;
  padding-right: 50px;
`

export const FormRightContent = styled.div`
  width: 32%;
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
export const Content = styled.div`
  vertical-align: middle;
  display: inline-block;
  background-color: #fff;
  position: relative;
  z-index: 200;
  min-width: 600px;
  width: 100%;
  max-width: 1040px;
  border-radius: 3px;
`