import React from 'react';
import DashBoard from './DashBoard/DashBoard';
import ProjectsBoard from './ProjectsBoard/ProjectsBoard';
import PeopleBoard from './PeopleBoard/PeopleBoard';
import InboxBoard from './InboxBoard/InboxBoard';
import SettingBoard from './SettingBoard/SettingBoard';

// Private routes.
export const Dashboard = () => <DashBoard />;
export const Projects = () => <ProjectsBoard />;
export const People = () => <PeopleBoard />;
export const Inbox = () => <InboxBoard />;
export const Setting = () => <SettingBoard />;
