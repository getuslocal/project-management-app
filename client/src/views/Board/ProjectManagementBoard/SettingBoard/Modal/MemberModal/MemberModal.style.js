import styled, { css } from 'styled-components'
import { color } from '../../../../../../shared/utils/styles';
import Button from '../../../../../../shared/components/Button/Button';

export const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`

export const Container = styled.div`
  background-color: rgba(23, 43, 77, .5);
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`

export const Content = styled.div`
  vertical-align: middle;
  display: inline-block;
  background-color: #fff;
  position: relative;
  z-index: 200;
  width: 700px;
  max-width: 700px;
  border-radius: 3px;

  .key-input{
    text-transform: uppercase;
  }
`

export const Title = styled.p`
  padding: 16px 30px 10px;
  font-size: 19px;
  line-height: 1.5;
  font-weight: 500;
`
export const Description = styled.p`
  padding: 0 30px;
  font-size: 12px;
  margin-bottom: 16px;
  color:${color.textLight};

  & > span {
    color:${color.danger};
  }
`

export const InnerWrapper = styled.div`
  padding: 0 30px;
  margin: 0 auto;
  min-height: 300px;
`

export const ButtonsContainer = styled.div`
  text-align: right;
  padding: 10px 30px;

  ${({ isEpicModal }) => isEpicModal && css`
  input {
    background-color: purple !important
  }
  p{
    color: purple !important
  }
`}
`
export const SubmitButton = styled.button`
  font-weight: 600;
  background-color: rgb(0, 82, 204);
  border-radius: 3px;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 15px;
  border: none;

  &:hover {
    opacity: .9;
    cursor: pointer;
  }
`
export const TextButton = styled.p`
  display: inline-block;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px;
  color: rgb(0, 82, 204);

  &:hover {
    opacity: .9;
    background-color: rgba(9, 30, 66, 0.08);
    cursor: pointer;
  }
`

// 
export const ListContainer = styled.div`
  border: 1px solid ${color.borderLightest};
  padding: 10px;
`

export const List = styled.div`
  display: flex;
  align-items: center;
`

export const ListLeft = styled.div`
  margin-right: 10px;
`

export const ListCenter = styled.div`
  font-size: 13.5px;
`

export const Name = styled.p`
`

export const Email = styled.p`
  font-size: 11px;
  color: ${color.textLight};
`

export const Role = styled.span`
  font-size: 12px;
`
export const NewUserButton = styled(Button)`
  background-color: ${color.darkGreen};
  color: ${color.white};
  font-size: 12px;
  line-height: 14px;
  padding: 8px 16px;
`

// 
export const Table = styled.table`
  width: 100%;
  /* min-width: 800px; */
  overflow-x: scroll;
  border-collapse: collapse;
  margin: 0;
  border: 1px solid ${color.borderLightest};
  word-wrap: break-word;
`;

export const BodyRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(211, 212, 213, .36);
  }

`;

export const TableHeader = styled.th`
  background-color: #f5f8fa;
  color: ${color.textDarkest};
  text-align: left;
  min-width: ${(props) => props.width ? `${props.width}` : 'auto'};
  border-bottom: 3px solid #eaf0f6;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  background-color: #f5f8fa;
  text-align: left;
  text-transform: uppercase;
  padding: 6px 10px;
`;

export const TableData = styled.td`
  padding: 6px 10px;
  font-weight:500;
  font-size: 13.5px;
  color: ${color.textDark};
  
  & > i {
    vertical-align: middle;
  }
`;
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  & > i {
    margin-right: 10px;
  }
`;
export const Count = styled.p`
  font-size: 13.5px;
  font-weight: 500;
  color: ${color.textMedium};
  position: absolute;
  bottom: 0;
  right: 0;
`;

// 
export const SelectItem = styled.div`
  font-size: 13.5px;
  width: 100%;
  color: #172b4d;
  font-style: normal;
  font-weight: 400;
  display: flex;
  align-items: center;
  & > i{
    margin-right: 7px;
  }
`
export const Position = styled.p`
  font-size: 12px;
  color: ${color.textLight};
  margin-left: auto;
`

export const RemoveButton = styled.p`
  font-size: 12px;
  color: ${color.textLight};
  width: 70px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  background-color: ${color.backgroundLightest};

  &:hover{
    color: ${color.textVeryLight};
    cursor: pointer;
  }
`