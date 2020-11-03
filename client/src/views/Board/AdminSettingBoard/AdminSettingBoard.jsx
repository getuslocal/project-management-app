import React, { Fragment } from 'react';
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';
import OrganizationSetting from './OrganizationSetting/OrganizationSetting';
import {
  Container
} from './AdminSettingBoard.style'

const AdminSettingBoard = ({
  component,
  baseUrl,
}) => {
  return (
    <Fragment>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentTab='' />
      <Container>
        <OrganizationSetting />
      </Container>
    </Fragment>
  )
}

export default AdminSettingBoard;