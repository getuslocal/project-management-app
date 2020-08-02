import styled from 'styled-components';

export const Padding = styled.div`
  padding-top: ${(props) => console.log("padding", props) || props.top}px;
  padding-right: ${(props) => props.right}px;
  padding-bottom: ${(props) => props.bottom}px;
  padding-left: ${(props) => props.left}px;
`
Padding.defaultProps = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}

export const Margin = styled.div`
  margin-top: ${(props) => props.top}em;
  margin-right: ${(props) => props.right}em;
  margin-bottom: ${(props) => props.bottom}em;
  margin-left: ${(props) => props.left}em;
`
Margin.defaultProps = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}

export const Text = styled.span`
  display: ${props => props.disp};
  text-align: ${props => props.ta};
  font-size: ${props => props.fs};
  color: ${props => props.color};
  font-weight: ${props => props.fw};
  line-height: ${props => props.lh};
`
Text.defaultProps = {
    "display": "inline",
    "text-align": "left",
    "font-size": "12px",
    "color": "#4B5467",
    "font-weight": "normal",
    "line-height": "1px"
}

export const Border = styled.div`
  border-top: ${(props) => props.top} solid ${(props) => props.color};
  border-right: ${(props) => props.right} solid ${(props) => props.color};
  border-bottom: ${(props) => props.bottom} solid ${(props) => props.color};
  border-left: ${(props) => props.left} solid ${(props) => props.color};
`
Border.defaultProps = {
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    color: "#c9d2db"
}

export const Strong = styled.span`
  font-size: ${props => props.fs};
  color: ${props => props.color};
  font-weight: 600;
`
Strong.defaultProps = {
    "font-size": "14px",
    "font-color": "#262626"
}