import React from 'react';
import JumbotronWrapper from '../components/JumbotronWrapper';

// Private routes.
const Dashboard = () => <DashBoard />;
const Manager = () => <JumbotronWrapper title="Home" />;

export {
	Dashboard,
	Manager,
};