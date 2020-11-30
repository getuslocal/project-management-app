import styled, { css } from 'styled-components';

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
  margin-top: ${(props) => props.top}px;
  margin-right: ${(props) => props.right}px;
  margin-bottom: ${(props) => props.bottom}px;
  margin-left: ${(props) => props.left}px;
`
Margin.defaultProps = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

// Add hover effect to element.
export const Hover = styled.div`
  display : ${(props) => props.inlineBlock ? 'inline-block' : 'block'};
  &:hover{
    background-color: ${(props) => props.bgColor} !important;
    border-radius: ${(props) => props.borderRadius}px;
    opacity: ${(props) => props.opacity};
  }
`

Hover.defaultProps = {
  bgColor: "#fff",
  borderRadius: 0,
  inlineBlock: false,
  opacity: 1,
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

export const media = {
  large: (...args) => css`
  @media (max-width: 1250px) {
    ${css(...args)}
  }
`,
  medium: (...args) => css`
  @media (max-width: 768) {
    ${css(...args)}
  }
`,
  small: (...args) => css`
  @media (max-width: 568px) {
    ${css(...args)}
  }
`
}