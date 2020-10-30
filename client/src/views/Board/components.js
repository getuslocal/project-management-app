import React from 'react';
import DashBoardContainer from './DashBoard/DashBoard.container';
import ProjectsBoardContainer from './ProjectsBoard/ProjectsBoard.container';
import ProjectManagementBoard from './ProjectManagementBoard/ProjectManagementBoard';
import InboxBoard from './InboxBoard/InboxBoard';
import SettingBoard from './SettingBoard/SettingBoard';

// Private routes.
export const Dashboard = (props) => <DashBoardContainer {...props}/>;
export const Projects = (props) => <ProjectsBoardContainer {...props}/>;
export const ProjectManagement = (props) => <ProjectManagementBoard {...props}/>;
export const Inbox = (props) => <InboxBoard {...props}/>;
export const Setting = (props) => <SettingBoard {...props}/>;
