import styled, { css } from 'styled-components'
import { color } from '../../../../../../shared/utils/styles'

export const Container = styled.div`
  box-shadow: 0 1px 4px 2px rgba(15, 53, 169, .1);
  border-radius: 5px;
  padding: 20px 20px 10px;
  min-width: 24%;
  width: 24%;
  margin-right: calc(4% / 3);
  margin-top: 15px;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

export const Top = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const TopLeft = styled.div`
`;

export const TopRight = styled.div`
  margin-left: auto;
`;

export const NameText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
`;

export const CategoryText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${color.textMedium};
  `;

export const ImageWithProgressBar = styled.div`
  width: 45px;
  height: 45px;
`;

export const ProgressBarInner = styled.div`
  background-image: url("https://st2.depositphotos.com/4328131/6387/v/450/depositphotos_63870593-stock-illustration-graphic-silver-b-letter-symbol.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  /* background: red; */
  height: 37px;
  max-height: 37px;
  width: 37px;
  max-width: 37px;
`;

export const Center = styled.div`
  padding-bottom: 20px;
  margin-bottom: 10px;
  min-height: 120px;
  border-bottom: 1px solid rgba(211, 212, 213, .36);
`;

export const DescriptionText = styled.div`
  font-size: 12.5px;
  font-weight: 500;
  color: ${color.textLight};
  line-height: 1.8;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
`;

export const BottomLeftText = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  margin-right: 5px;
`;

export const MemberList = styled.ul`
  & > li {
    margin-right: 4px;
    display: inline-block;
  }
`;

export const Link = styled.div`
  margin-left: auto;
  color: ${color.textVeryLight};

  & > i {
    &:hover{
      color: ${color.primary};
      cursor: pointer;
    }
  }
`;