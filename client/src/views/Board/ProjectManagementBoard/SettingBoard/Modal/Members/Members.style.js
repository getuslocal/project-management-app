import styled, { css } from 'styled-components'
import { color } from '../../../../../../shared/utils/styles'

export const SectionContainer = styled.div`
  margin: 20px 0;
  position: relative;
`

export const SectionTitle = styled.p`
  display: block;
  color: #5e6c84;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
`

export const ListContainer = styled.ul`
  border: 1px solid #dfe1e6;
  font-weight: 400;
  border-radius: 3px;
  background-color: rgb(250,251,252);
  display: flex;
  flex-direction:column;
  justify-content: center;
  position: relative;
  &:hover {
    background-color: ${color.hoverGray};
  }
`

export const Close = styled.div`
  margin-right: 10px;
  cursor: pointer;
`
export const Title = styled.span`
  margin-left: auto;
  font-weight: 500;
  color:${color.textMedium};
`

export const SelectItem = styled.div`
  font-size: 12px;
  width: 100%;
  color: #172b4d;
  font-style: normal;
  font-weight: 400;
  display: flex;
  align-items: center;

  & > i{
    margin-right: 7px;
  }

  &.selected-item{
    padding: 5px 10px;
    &:not(:last-child){
    border-bottom: 1px solid ${color.borderLightest};
    }
  }
`

export const Name= styled.span`
  font-size: 13.5px;
`

export const Description = styled.p`
  font-weight: 400;
  line-height: 20px;
  font-size: 11px;
  color: ${color.textLight};
`