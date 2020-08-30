import React from 'react';
import DashBoard from '../../views/components/Board/DashBoard/DashBoard';
import ProjectsBoardContainer from '../../views/components/Board/ProjectsBoard/ProjectsBoard.container';
import PeopleBoard from '../../views/components/Board/PeopleBoard/PeopleBoard';
import InboxBoard from '../../views/components/Board/InboxBoard/InboxBoard';
import SettingBoard from '../../views/components/Board/SettingBoard/SettingBoard';

// Private routes.
export const Dashboard = (props) => <DashBoard {...props}/>;
export const Projects = (props) => <ProjectsBoardContainer {...props}/>;
export const People = (props) => <PeopleBoard {...props}/>;
export const Inbox = (props) => <InboxBoard {...props}/>;
export const Setting = (props) => <SettingBoard {...props}/>;
