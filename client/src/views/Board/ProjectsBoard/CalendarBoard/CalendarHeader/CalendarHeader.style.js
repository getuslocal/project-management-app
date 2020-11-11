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
  & > .angle-button {
    padding: 0;
    height: 36px;
    line-height: 36px;
    min-width: 36px;
    width: 36px;
    text-align: center;
  }

  & > .today-button {
    padding: 0 20px;
    margin: 0 2px;
    height: 36px;
    max-height: 36px;
    font-size: 14px;
    line-height: 36px;
  }
`