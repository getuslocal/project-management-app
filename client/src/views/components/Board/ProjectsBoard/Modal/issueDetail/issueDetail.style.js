import styled from 'styled-components'

export const Blanket = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
`

export const Title = styled.p`
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
  margin-bottom: 1.5em;
`

export const ButtonsContainer = styled.div`
  text-align: right;
  padding: 20px 30px;
`

export const SubmitButton = styled.input`
  font-weight: 600;
  background-color: rgb(0, 82, 204);
  border-radius: 3px;
  color: #fff;
  padding: .6em;
  font-size: 14px;
  font-weight: 500;
  border: none;

  &:hover {
    opacity: .9;
    cursor: pointer;
  }
`

export const Content = styled.div`
    padding: 0 30px 30px;
  min-height: 500px;
  display: flex;
`

export const Left = styled.div`
  width: 68%;
  padding-right: 50px;
`

export const Right = styled.div`
  width: 32%;
`

export const Wrapper = styled.div`
  vertical-align: middle;
  display: inline-block;
  background-color: #fff;
  position: relative;
  z-index: 200;
  min-width: 600px;
  width: 100%;
  max-width: 1040px;
  border-radius: 3px;
`

// 
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
  font-size: 14px;
  padding: 5px 8px;
  min-height: 35px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  position: relative;

  &:hover {
    background-color: #091e420d;
    cursor: pointer;
  }

  &.icon-angle-down{
    &:after{
      position: absolute;
      right: 10px;
    }
  }
`
export const IconCont = styled.span`
  margin-right: 10px;
`