import styled from 'styled-components';

export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  min-height: 40px;
  height: 40px;
`

export const Left = styled.div`
  font-size: 24px;
`

export const Month = styled.span`
  margin-right: .5em;
`

export const Right = styled.div`
`

export const TodayButton = styled.button`
  cursor: pointer;
  border: 1px solid rgb(0, 82, 204);
  border-radius: 3px;
  padding: .65rem .9rem;
  font-weight: 500;
  margin-left: .75rem;
  margin-right: .75rem;
  font-size: 14px;
  color: rgb(0, 82, 204);
`

export const MoveButton = styled.button`
  padding: .65rem .9rem;
  color: rgba(0, 0, 0, 0.7);
`

export const BottomContent = styled.div`
  display: flex;
  padding-bottom: 5px;
  border-bottom: 2px solid rgba(166, 168, 179, 0.12);
  padding-right: 13px;
`
export const DayCell = styled.div`
  width: 14.28%;
  max-width: 14.28%;
  padding: 0 .5rem;
  text-align: right;
  color: #99a1a7;
  font-weight: 500;
  font-size: 14px;
`