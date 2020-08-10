import React from 'react';
import DashBoard from '../../views/components/DashBoard/DashBoard';
import ProjectsBoard from '../../views/components/ProjectsBoard/ProjectsBoard';
import PeopleBoard from '../../views/components/PeopleBoard/PeopleBoard';
import InboxBoard from '../../views/components/InboxBoard/InboxBoard';
import SettingBoard from '../../views/components/SettingBoard/SettingBoard';

// Private routes.
export const Dashboard = () => <DashBoard />;
export const Projects = () => <ProjectsBoard />;
export const People = () => <PeopleBoard />;
export const Inbox = () => <InboxBoard />;
export const Setting = () => <SettingBoard />;
