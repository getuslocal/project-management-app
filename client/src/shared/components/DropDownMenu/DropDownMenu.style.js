import styled from 'styled-components'
import { color } from '../../utils/styles'

export const Container = styled.div`
  margin: 20px 0;
  position: relative;
`

export const Title = styled.p`
  color: ${color.textMedium};
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid ${color.backgroundMedium};
  border-radius: 3px;
  background-color: ${color.backgroundLightest2};
  min-height: 40px;

  &:hover {
    background-color: ${color.hoverGray};
  }
`

export const CurrentItem = styled.div`
  font-size: 14px;
  color: ${color.textDarkest};
  font-style: normal;
  font-weight: 400;
  display: flex;
  align-items: center;

  & > i {
    margin-right: 7px;
  }

  .placeholder {
    color: ${color.textLight};
  }
`

export const AngleDownIcon = styled.span`
  margin-left: auto;
`