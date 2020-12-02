import styled, { css } from 'styled-components'
import { color } from '../../../../../shared/utils/styles'

export const CreateTicketButton = styled.div`
  padding: 12px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: transparent;

  &:hover{
    background-color: rgba(9, 30, 66, 0.08);
    cursor: pointer;
  }

  /* If it is a first column, display the button by default. */
  ${({ isFirstColumn }) => isFirstColumn && css`
    display: block;
    color: ${color.textDark};
  `}
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
  min-width: 282px;
  max-width: 282px;
  box-shadow: ${props => (props.isDragging ? 'rgba(0, 0, 0, 0.2) 0 3px 3px 0' : 'none')};
  position: relative;
  
  &:hover{
    ${CreateTicketButton} {
      display: block;
      color: ${color.textDark};
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: ${color.backgroundLightest};
  padding: 0 5px 5px;
  height: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`

export const Top = styled.div`
  width: 100%;
  background-color: ${color.white};
  position: sticky;
  top: 0px;
  /* border-bottom: 1px solid ${color.borderLight}; */
`

export const TopContent = styled.div`
  padding: 6px;
  font-size: 14px;
  width: 100%;
  font-weight: 500;
  color: ${color.gray};
  display: flex;
  align-items: center;
  background: ${color.backgroundLightest};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  &:hover {
    .delete-column-btn {
      display: block;
    }
  }

  .delete-column-btn {
    display: inline-block;
    display: none;
    height: 22px;
    line-height: 22px;
    min-width: 22px;
    width: 22px;
    text-align: center;
    border-radius: 3px;
    color: ${color.textMedium};
    margin-left: auto;
    cursor: pointer;

    &:hover {
      background-color: ${color.hoverGray};
    }
  }

  .check-icon {
    color: ${color.success};
  }
`

export const TitleText = styled.p`
  padding: 6px 4px;
  border-radius: 3px;
  min-width: 50px;
  min-height: 30px;
  appearance: none;
  border: 1px solid transparent;
  background-color: inherit;
  color: ${color.gray};
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    background-color: ${color.hoverGray};
    cursor: pointer;
  }
`

export const Counter = styled.p`
  font-size: 12px;
  margin-left: 5px;
  margin-right: 2px;
`

export const TitleInput = styled.input`
  padding: 6px 4px;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 3px;
  font-size: 14px;
  line-height: 16px;
  appearance: none;
  border: 1px solid ${color.borderInputFocus};
  font-weight: 500;
  width: 100%;
  transition: all .2s;
  background-color: ${color.white};
  outline: none;
  box-shadow: ${color.borderInputFocus} 0px 0px 0px 1px;
  color: ${color.textDark};
  background-color: ${color.white};
`

export const TicketsList = styled.div`
  flex-grow: 1;
  min-height: 300px;
`

export const Options = styled.div`
  margin-left: auto;
  position: absolute;
  top: 100%;
  right: 0;
`

export const Option = styled.button`
  height: 30px;
  min-width: 32px;
  width: 32px;
  background-color: ${color.backgroundLightest2};
  margin-right: 6px;
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
  color: ${color.textMedium};
  border: 1px solid ${color.borderLight};

  &:hover {
    background-color: ${color.backgroundLightest};
  }
`