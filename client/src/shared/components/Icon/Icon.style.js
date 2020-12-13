import styled, { css } from 'styled-components'
import { IssueColors } from '../../constants/issues';

export const StyledIcon = styled.i`
  display: inline-block;
  font-size: ${props => `${props.size}px`};
  line-height: 1;
  ${props =>
    props.left || props.top ? `transform: translate(${props.left}px, ${props.top}px);` : ''}
  &:before {
    content: "${props => props.code}";
    font-family: "Font Awesome 5 Free" !important;
    speak: none;
    font-style: normal;
    font-weight: ${props => props.isSolid ? '900' : '400'};
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    ${props => customIcons[props.iconType]}
  }
`;

const issueType = css`
  font-weight: 900;
  display:inline-block;
  font-size:  ${props => `${props.size - 4}px`};
  text-align: center;
  height: ${props => `${props.size}px`};
  line-height: ${props => `${props.size}px`};
  width:  ${props => `${props.size}px`};
  border-radius: 2px;
  color: #fff;
`

const issueColor = css`
  height: ${props => `${props.size}px`};
  width:  ${props => `${props.size}px`};
  display :  inline-block;
  border-radius: 2px;
`

const userIcon = css`
  background-image: url(${props => props.imageUrl});
  height: ${props => `${props.size}px`};
  width:  ${props => `${props.size}px`};
  background-size: cover;
  background-position: center;
  display :  inline-block;
  border-radius: 50%;
  object-fit: cover;
`

const customIcons = {
  task: css`
    background-color: rgb(79, 173, 230);
    ${issueType}
  `,
  bug: css`
    background-color: rgb(228, 77, 66);
    ${issueType}
  `,
  story: css`
    background-color: rgb(101, 186, 67);
    ${issueType}
  `,
  epic: css`
    background-color: rgb(101, 84, 192);
    ${issueType}
  `,
  [`priority-medium`]: css`
    color: rgb(233, 127, 51);
  `,
  [`priority-low`]: css`
    color: rgb(45, 135, 56);
  `,
  [`priority-lowest`]: css`
    color: rgb(45, 135, 56);
  `,
  [`priority-high`]: css`
    color: rgb(205, 19, 23);
  `,
  [`priority-highest`]: css`
    color: rgb(205, 19, 23);
  `,
  [`user-icon`]: css`
    ${userIcon}
  `,
  [`project-icon`]: css`
    ${userIcon}
  `,
  [`issue-purple`]: css`
    background-color:${IssueColors['PURPLE'].border};
    ${issueColor}
  `,
  [`issue-yellow`]: css`
    background-color:${IssueColors['YELLOW'].border};
    ${issueColor}
  `,
  [`issue-blue`]: css`
    background-color:${IssueColors['BLUE'].border};
    ${issueColor}
  `,
  [`issue-red`]: css`
    background-color:${IssueColors['RED'].border};
    ${issueColor}
  `,
};
