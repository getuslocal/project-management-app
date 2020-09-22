import styled, { css } from 'styled-components'

export const InnerContainer = styled.div`
  border : none;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);
  width: 100%;
  position: relative;

${({ isEpicTicket }) => isEpicTicket ? css`
  border: none;
  background-color: #fff;
  ` : css`
  &:hover {
    background-color: #091e420d;
    cursor: pointer;
  }
`}
`

export const Label = styled.label`
  display: block;
  color: #5e6c84;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 2px;

  ${({ isEpicTicket }) => isEpicTicket && css`
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
`}
`

export const ListContainer = styled.ul`
  padding: ${({isEpicTicket}) => isEpicTicket ? '4px 0' : '4px 30px 4px 8px'};
  width: 100%;
  min-height: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #172b4d;
  border: none;
  
`

export const List = styled.li`
  padding: 3px 0;
  &:not(:last-child){
    margin-bottom: 4px;
  }

${({ isEpicTicket }) => isEpicTicket && css`
  font-size: 12px;
  &:not(:last-child){
    margin-bottom: 10px;
  }

  > span {
    color: rgb(137, 147, 164);
    font-weight: 600;
  }
`}

`

export const AddButton = styled.button`
  padding: 5px;
  font-size: 12px;
  color: rgb(137, 147, 164);
  font-weight: 600;
  border-radius: 3px;

  &:hover{
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.08);
  }
`