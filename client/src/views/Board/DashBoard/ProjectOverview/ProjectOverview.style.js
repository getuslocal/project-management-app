import styled, { css } from 'styled-components'
import { color } from '../../../../shared/utils/styles'
import Button from '../../../../shared/components/Button/Button'

export const Container = styled.div`
  padding: 0 20px;
  min-height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Top = styled.div`
  padding-bottom: 12px;
`;

export const NameCont = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Name = styled.p`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const IconCont = styled.p`
  position: absolute;
  right: 0;
  & > i {
    &::before {
      border: 2px solid ${color.secondary};
    }
  }
`;

export const Category = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  color: ${color.textLight};
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 2;
  color: ${color.textDark};
`;

export const CustomButton = styled(Button)`
  margin-left: auto;
`;

export const ProjectLeadCont = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-right: 50px;
  display: flex;
  align-items: center;
`;
export const ProjectLead = styled.p`
    font-weight: 500;
    display: flex;
    align-items: center;
    
    & > i {
    vertical-align: middle;
    margin-right: 10px;
  }
`;

export const Bottom = styled.div`
  border-top: 1px solid ${color.borderLightest};
  padding-top: 10px;
  display: flex;
  align-items: center;
`;

export const Member = styled.div`
  display: flex;
  align-items: center;
`;

export const BottomTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-right: 10px;
`;

export const MemberList = styled.ul`
  & > li {
    margin-right: 4px;
    display: inline-block;
  }
`;
