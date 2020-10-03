import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 700px;
  max-height: 700px;
  overflow-y: scroll;
  position: relative;
`

export const Week = styled.div`
display: flex;
flex-wrap: nowrap;
`

export const QuickAddButton = styled.div`
float: left;
display: none;

&.icon-plus{
  &:before{
  font-size: 12px;
  padding: 4px 5px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
  color: #8993a4;
  border-radius: 3px;
  }
}
`

export const DayCell = styled.div`
width: 100%;
border-left: 2px solid rgba(166, 168, 179, 0.12);
border-bottom: 2px solid rgba(166, 168, 179, 0.12);
color: rgba(0, 0, 0, 0.2);
font-size: 14px;
/* overflow-y: scroll; */

&.gray {
  color: rgb(190, 190, 190);
}


${(props) =>
  props.isFocused && css`
color: rgba(0, 0, 0, 0.7);
font-weight: 500;
`};


&:nth-child(7n+1),
&:nth-child(7n) {
/* background: rgba(247, 246, 243,.8); */
background: rgba(0, 0, 0,.02);
}

${(props) =>
  props.isToday && css`
  color: #0052cc;

  &::before{
    content: '';
    display: block;
    border-top: 2px solid #0052cc;
  }
`};

&:hover {
  /* background-color: rgba(9, 30, 66, 0.04); */
  ${QuickAddButton} {
  cursor: pointer;
    display: block;
  }
}
`

export const Content = styled.div`
height: 100%;
`

export const Header = styled.div`
padding: 8px;
padding-top: ${(props) => props.isToday && '6px'};
text-align: right;
`
