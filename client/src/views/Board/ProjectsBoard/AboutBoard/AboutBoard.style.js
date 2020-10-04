import styled, { css } from 'styled-components'
import Input from '../../../../shared/components/Form/Input/Input';

export const Container = styled.div`
  margin: 20px auto;
  max-width: 1000px;
  position: relative;
`

export const Title = styled.h2`
`

export const CustomInput = styled(Input)`
  border-width: 2px;
  min-height: 40px;

  &:focus{
    box-shadow: none;
  }
`
export const FormCont = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

export const Image = styled.img`
  border-radius: 3px;
  /* border: 1px solid #dfe1e6; */
  width: 128px;
  height: 128px;
  margin: 0px auto;
  background-image: ${(props) => props.imageUrl};
  margin-bottom: 20px;
`

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;

  & > button {
    width: 120px;
    color: #5e6c84;
    &:hover {
      background-color: rgb(240 240 245);
    }
  }
`
