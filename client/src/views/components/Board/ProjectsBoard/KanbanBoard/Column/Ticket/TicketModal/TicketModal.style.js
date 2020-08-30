import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: absolute;
    height: 100%;
    left: 0;
    width: 100%;
    top: 0;
`
export const Blanket = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(23, 43, 77, .5);
`

export const MainContent = styled.div`
    background-color: #fff;
    position: relative;
    z-index: 9999;
    width: 800px;
    max-width: 800px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    border-radius: 3px;
    padding: 16px 32px;
    height: 600px;
    max-height: 600px;

    i{
      font-size: 20px;
      float: right;
      cursor: pointer;
    }
`
export const Title = styled.p`
      font-size: 19px;
      line-height: 1.5;
      font-weight: 500;
      margin-bottom: 1.5em;
`
export const ButtonsContainer = styled.div`
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: right;
      padding: 16px 24px;
`
export const SubmitButton = styled.input`
        font-weight: 600;
        background-color: rgb(0, 82, 204);
        border-radius: 3px;
        color: #fff;
        padding: .6em;
        font-size: 14px;
        font-weight: 500;
        margin-right: 1.5em;
        border: none;

        &:hover {
          opacity: .9;
          cursor: pointer;
        }
`
export const TextButton = styled.p`
        display: inline-block;
        padding: .6em;
        font-size: 14px;
        font-weight: 500;
        border-radius: 3px;
        color: rgb(0, 82, 204);

        &:hover {
          opacity: .9;
          background-color: rgba(9, 30, 66, 0.08);
          cursor: pointer;
        }
`