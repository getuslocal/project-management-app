import styled, { css } from 'styled-components';
import { media } from '../../../../../../shared/utils/global';
import { color } from '../../../../../../shared/utils/styles';

export const Container = styled.div`
  box-shadow: 0 1px 4px 2px rgba(15, 53, 169, 0.1);
  border-radius: 5px;
  padding: 20px 20px 10px;
  min-width: 24%;
  width: 24%;
  margin-right: calc(4% / 3);
  margin-top: 15px;
  display: flex;
  flex-direction: column;

  &:nth-child(4n) {
    margin-right: 0;
  }

  ${media.large`
    min-width: 32%;
    width: 32%;
    margin-right: calc(4% / 2);

    &:nth-child(3n) {
      margin-right: 0;
    }
  `};
`;

export const Top = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const TopRight = styled.div`
  margin-left: auto;
`;

export const NameText = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;

  & > a {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const CategoryText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${color.textMedium};
`;

export const ImageWithProgressBar = styled.div`
  width: 45px;
  height: 45px;
`;

export const ProgressBarInner = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  height: 37px;
  max-height: 37px;
  width: 37px;
  max-width: 37px;
`;

export const Center = styled.div`
  padding-bottom: 20px;
  min-height: 120px;
  max-height: 180px;
`;

export const DescriptionText = styled.div`
  height: 100%;
  font-size: 12.5px;
  font-weight: 500;
  color: ${color.textLight};
  line-height: 1.8;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Bottom = styled.div`
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(211, 212, 213, 0.36);
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
