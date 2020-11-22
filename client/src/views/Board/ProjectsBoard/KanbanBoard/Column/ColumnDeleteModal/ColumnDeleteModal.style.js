import styled, { css } from 'styled-components'
import { color } from '../../../../../../shared/utils/styles'

export const Container = styled.div`
  padding: 20px 30px;
  min-width: 500px;
  width: 500px;
`
export const Title = styled.p`
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
  margin-bottom: 20px;

  & > i {
    color: ${color.danger};
    margin-right: 10px;
  }
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
`

export const Options = styled.div`
  text-align: right;
  & > button {
    &:first-child{
      margin-right: 10px;
    }
  }
`
const firstColumnStyle = css`
  color: rgb(66, 82, 110) !important;
  background-color: rgb(223, 225, 230) !important;
`

const lastColumnStyle = css`
  background-color: rgb(227, 252, 239) !important;
  color: rgb(0, 102, 68) !important;
`

export const CustomButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-style: normal;
  line-height: 20px;
  padding: 6px 10px;
  min-height: 32px;
  border : none;
  border-radius: 3px;
  background: rgb(0, 82, 204);

  &:after{
    margin-left: 20px;
  }

  ${({ isFirstColumn }) => isFirstColumn && firstColumnStyle};
  ${({ isLastColumn }) => isLastColumn && lastColumnStyle};
`

export const StyledText = styled.span`
  color: rgb(7, 71, 166);
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: 700;
  background-color: rgb(222, 235, 255);
  font-size: 12px;
  
  ${({ isFirstColumn }) => isFirstColumn && firstColumnStyle};
  ${({ isLastColumn }) => isLastColumn && lastColumnStyle};
`