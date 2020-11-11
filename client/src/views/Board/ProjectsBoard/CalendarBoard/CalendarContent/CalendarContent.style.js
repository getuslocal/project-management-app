import styled from 'styled-components';

export const Container = styled.div`
`

export const Top = styled.div`
  display: flex;
  padding-bottom: 7px;
  border-bottom: 2px solid rgba(166, 168, 179, 0.12);
  padding-right: 13px;
`

export const DayName = styled.div`
  width: calc(100% / 7);
  max-width: calc(100% / 7);
  padding: 0 5px;
  text-align: right;
  color: #99a1a7;
  font-weight: 500;
  font-size: 14px;
`

export const Bottom = styled.div`
  height: calc(100vh - 230px);
  max-height: calc(100vh - 230px);
  overflow-y: scroll;
  position: relative;
`

export const Week = styled.div`
  display: flex;
  flex-wrap: nowrap;
`