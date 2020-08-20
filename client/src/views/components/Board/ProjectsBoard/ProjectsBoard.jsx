import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';

const Board = () => (
  <h1>Board</h1>
)
const RoadMap = () => (
  <h1>RoadMap</h1>
)
const Members = () => (
  <h1>Members</h1>
)
const Settings = () => (
  <h1>Settings</h1>
)

const ProjectsBoard = ({ component: { title, tabs }, baseUrl, ...props }) => {
  const { project, tab } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const projectUri = baseUrl + '/' + project;
  const currentRoute = tab ? tab : '';
  // console.log(props.match) // match.url =  "/app/projects/5f3b5f40e919715784ea0ac0/roadmap".
  return (
    <>
      <TopNavigationBar title={title} tabs={tabs} baseUrl={projectUri} currentRoute={currentRoute} />
      <div style={{ height: '100%', background: 'whitesmoke' }}>
        <h1>ProjectsBoard</h1>
        <Switch>
          <Route exact path={projectUri} component={Board} />
          <Route exact path={`${projectUri}/roadmap`} component={RoadMap} />
          <Route exact path={`${projectUri}/members`} component={Members} />
          <Route exact path={`${projectUri}/settings`} component={Settings} />
        </Switch>
      </div>
    </>
  )
}

export default withRouter(ProjectsBoard);