import styled from 'styled-components'
import { media } from '../../shared/utils/global'

export const LayoutContainer = styled.div`
  height: 100%;
  min-height: 100%;
  min-width: 920px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: width .3s;
  width: ${props => `calc(100% - ${props.secondaryView ? '40px' : '220px'})`};
  padding: 0 40px;
  margin-left: auto;

  ${media.large`
    padding: 0 20px;
    width: calc(100% - 40px);
  `}
`