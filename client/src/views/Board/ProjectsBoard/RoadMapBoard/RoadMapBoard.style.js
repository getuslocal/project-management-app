import styled from 'styled-components'
import {color} from '../../../../shared/utils/styles'

export const Container = styled.div`
  height: 765px;
  width: 100%;
  display: flex;
  position: relative;
  border: 2px solid ${color.borderLight};
  border-radius: 5px;
`

export const Left = styled.div`
  width: 270px;
  min-width: 270px;
  height: 100%;
  border-right: 2px solid ${color.borderLight};
  /* background: ${color.backgroundLightest}; */
`

export const TopText = styled.p`
  height: 50px;
  font-weight: 600;
  /* text-align:center; */
  padding: 0 16px;
  font-size: 16px;
  line-height: 50px;
  font-weight: 500;
  color: ${color.textMedium};
  font-size: 14px;
  position: relative;
  /* background: ${color.backgroundLightest}; */
  border-bottom: 2px solid ${color.borderLight};

  & > span {
    float: right;
  }
`

export const Right = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  /* background: rgb(250,251,252); */
  /* background: ${color.backgroundLightest}; */
  /* border-radius: 5px; */
`