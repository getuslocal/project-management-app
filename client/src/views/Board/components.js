import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import ProjectsBoardContainer from './ProjectsBoard/ProjectsBoard.container';
import PeopleBoard from './PeopleBoard/PeopleBoard';
import InboxBoard from './InboxBoard/InboxBoard';
import SettingBoard from './SettingBoard/SettingBoard';

// Private routes.
export const Dashboard = (props) => <DashBoard {...props}/>;
export const Projects = (props) => <ProjectsBoardContainer {...props}/>;
export const People = (props) => <PeopleBoard {...props}/>;
export const Inbox = (props) => <InboxBoard {...props}/>;
export const Setting = (props) => <SettingBoard {...props}/>;
