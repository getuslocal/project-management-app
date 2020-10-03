import styled, { css } from 'styled-components'

export const Title = styled.p`
  padding: 20px 30px;
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
`
export const InnerWrapper = styled.div`
  padding: 0 30px;
  height: 700px;
  overflow-y: scroll;
`

export const ButtonsContainer = styled.div`
  text-align: right;
  padding: 10px 30px;

  ${({ isEpicModal }) => isEpicModal && css`
  input {
    background-color: purple !important
  }
  p{
    color: purple !important
  }
`}
`
export const SubmitButton = styled.input`
  font-weight: 600;
  background-color: rgb(0, 82, 204);
  border-radius: 3px;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 15px;
  border: none;

  &:hover {
    opacity: .9;
    cursor: pointer;
  }
`
export const TextButton = styled.p`
  display: inline-block;
  padding: 10px;
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
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  background-color: rgb(250, 251, 252);
  min-height: 35px;

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
`

export const AngleDownIcon = styled.span`
  margin-left: auto;
`

export const Description = styled.p`
  font-weight: 400;
  line-height: 20px;
  font-size: 11px;
  color: #6c798f;
`