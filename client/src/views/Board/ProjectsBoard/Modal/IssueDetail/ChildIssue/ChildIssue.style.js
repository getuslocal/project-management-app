import styled from 'styled-components'

export const ListContainer = styled.ul`
  padding: 5px 10px;
  font-weight: 400;
  border-radius: 3px;
  min-height: 35px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  &:hover {
    background-color: #091e420d;
  }
`

export const List = styled.li`
  font-size: 12px;
  padding: 3px 0;
  display: flex;
  align-items: center;

  &:not(:last-child){
    margin-bottom: 10px;
  }
`

export const AddButton = styled.p`
  font-size: 12px;
  color: rgb(137, 147, 164);
  font-weight: 600;
`

export const Close = styled.span`
  margin-right: 8px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  width: 14px;

  &:hover{
    cursor: pointer;
  }
`

export const IconCont = styled.span`
  margin-right: 5px;
`

export const Key = styled.span`
  color: rgb(137, 147, 164);
  margin-right: 5px;
  font-weight: 600;
`

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #172b4d;
`

export const SelectItem = styled.div`
  font-size: 14px;
  color: #172b4d;
  font-style: normal;
  font-weight: 400;
  display: flex;
  align-items: center;

  & > i{
    margin-right: 7px;
  }
`