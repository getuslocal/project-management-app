import styled, { css } from 'styled-components'
import { color } from '../../../shared/utils/styles'

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

export const UserIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;

  & > i {
    &::before{
      border: 2px solid ${color.borderLight};
    }
  }

  & > button {
    color: #5e6c84;

    &:hover {
      background-color: rgb(240 240 245);
    }
  }
`

export const FileUpload = styled.div`

  & > label {
    color: #5e6c84;
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    border-radius: 3px;
    padding: 10px 12px;
    background: #F4F5F7;

    & > i {
      margin-right: 4px;
    }

    &:hover {
      background-color: rgb(240 240 245);
    }
  }

  input[type="file"] {
    display: none;
  }
`

export const Options = styled.div`
  text-align: right;
  & > button {
    &:first-child{
      margin-right: 10px;
    }
  }
`
