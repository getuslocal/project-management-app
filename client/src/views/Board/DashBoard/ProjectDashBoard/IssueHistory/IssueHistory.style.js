import styled from 'styled-components';
import { color } from '../../../../../shared/utils/styles';

export const Container = styled.div`
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

export const ListContainer = styled.ul`
  position: relative;

  &:before {
    left: 135px;
    height: 100%;
    content: '';
    position: absolute;
    border-left: 2px solid ${color.primary};
  }
`;

export const List = styled.li`
  display: flex;
  width: 100%;
  margin: 20px 0;
  padding: 5px 10px 5px 0;
`;

export const Left = styled.div`
  min-width: 120px;
  position: relative;
  margin-right: 40px;
`;

export const Date = styled.span`
  color: rgb(94, 108, 132);
  font-weight: 500;
  font-size: 12px;
  display: inline-block;
  text-align: right;
  width: 100%;
  margin-top: 10px;
`;

export const CircleMark = styled.span`
  top: 10px;
  left: 129px;
  width: 14px;
  border: 3px solid ${color.primary};
  height: 14px;
  position: absolute;
  background: #fff;
  border-radius: 50%;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const IconCont = styled.p`
  margin-right: 10px;
`;

export const MainContent = styled.p`
  font-size: 13.5px;
  font-weight: 500;
`;

export const EditorName = styled.span`
  color: #3b73af;
  font-weight: 600;
  margin-right: 5px;
`;

export const Bold = styled.span`
  font-weight: 700;
`;

export const TicketName = styled.span`
  margin-left: 5px;
  color: #3b73af;
  font-weight: 500;

  & > i {
    margin-right: 7px;
  }

  & > a {
    &:hover {
      text-decoration: underline;
      text-decoration-color: #3b73af;
    }
  }

  .deleted-text {
    color: ${color.textDark};
  }
`;

export const NoResultText = styled.p`
  font-weight: 500;
  font-size: 14px;
  padding: 0 10px;
  color: ${color.textMedium};
`;
