import styled from 'styled-components'
import { zIndexValues } from '../../utils/styles'

export const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  overflow: hidden auto;
`

export const Blanket = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
`

export const Container = styled.div`
  background-color: rgba(23, 43, 77, .5);
  min-height: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 50px;
`

export const Title = styled.p`
  padding: 20px 30px;
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
`

export const Wrapper = styled.div`
  vertical-align: middle;
  display: inline-block;
  background-color: #fff;
  position: relative;
  z-index: ${zIndexValues.modal};
  /* min-width: 600px;
  width: 100%;
  max-width: 1040px; */
  border-radius: 3px;
`