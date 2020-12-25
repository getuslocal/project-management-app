import styled from 'styled-components';
import Icon from '../../../../../../shared/components/Icon/Icon';
import { color } from '../../../../../../shared/utils/styles';

export const Container = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 12px;
  color: rgb(23, 43, 77);
  margin: 4px 0px;
  border-radius: 3px;
  box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px,
    rgba(23, 43, 77, 0.2) 0px 0px 1px;
  background-color: ${(props) =>
    props.isDragging ? 'rgb(222 ,235, 255)' : 'white'};
  &:hover {
    cursor: pointer;
    background-color: rgb(249, 249, 249);
  }
`;

export const TicketSummary = styled.p`
  overflow-wrap: break-word;
  word-break: break-word;
  margin-bottom: 8px;
  font-size: 13.5px;
  font-weight: 500;
`;
export const TicketStatus = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: rgb(122, 134, 154);
  display: flex;
  align-items: center;
  &:before {
    margin-right: 0.75em;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EpicWrapper = styled.div`
  margin-bottom: 5px;
`;
export const Epic = styled.p`
  background-color: ${({ issueColor }) =>
    issueColor ? issueColor.bg : 'rgba(135, 119, 217, 0.4)'};
  color: ${({ issueColor }) =>
    issueColor ? issueColor.font : 'rgb(64, 50, 148)'};
  border-radius: 3px;
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  padding: 2px 4px;
  text-transform: uppercase;
`;

export const CustomIcon = styled(Icon)`
  margin-right: 0;
`;
