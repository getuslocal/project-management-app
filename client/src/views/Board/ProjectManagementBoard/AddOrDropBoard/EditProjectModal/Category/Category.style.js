import styled from 'styled-components'
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

export const SectionContent = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 2px solid #dfe1e6;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);
  min-height: 40px;

  &:hover {
    background-color: #091e420d;
  }
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

  .placeholder {
    color: ${color.textLight};
  }
`

export const AngleDownIcon = styled.span`
  margin-left: auto;
`

export const UnassignText = styled.p`
  color: rgb(137, 147, 164);
  font-size: 14px;
`