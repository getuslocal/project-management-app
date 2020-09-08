import styled, { css } from 'styled-components'

export const IconContent = styled.span.attrs(({ iconStyle }) => {
  if (!iconStyle) return;
  const { base, type } = iconStyle;
  if (base === 'userIcon' || base === 'projectIcon' || !base || !type) return;
  // Assign a class name to add an icon as before pseude element (client/src/App/styles/IconStyles.js)
  return {
    className: `icon-${base.toLowerCase()}-${type.toLowerCase()}`,
  }
})`

  /* Common styles */
  margin-right: .5em;
  line-height: ${props => props.iconStyle.size};
  &:before,
  &:after {
    font-size: ${props => props.iconStyle.size} !important;
    display :  inline-block;
    vertical-align: middle;
  }

  /* User Icon */
  ${({ iconStyle }) => iconStyle.base === "userIcon" && css`
  &:before {
      content:'';
      background-image: url(${iconStyle.type});
      height: ${iconStyle.size};
      width:  ${iconStyle.size};
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      object-fit: cover;
    }
  `}

  /* Project Icon */
  ${({ iconStyle }) => iconStyle.base === "projectIcon" && css`
  &:before {
      content:'';
      background-image: url(${iconStyle.type});
      height: ${iconStyle.size};
      width:  ${iconStyle.size};
      background-size: cover;
      background-position: center;
      border-radius: 3px;
      object-fit: cover;
    }
  `}

`;

IconContent.defaultProps = {
  iconStyle: {
    base: '',
    type: '',
    size: '12px',
    renderValue: ''
  },
}