import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Demo1 = () => (
  <h1>Demo1</h1>
)
const ProjectsBoard = () => {
  return (
    <div style={{ height: '100%', background: 'whitesmoke' }}>
      <h1>ProjectsBoard</h1>
      <Switch>
        <Route exact path="/app/projects/demo1" component={Demo1} />
      </Switch>
    </div>
  )
}

export default ProjectsBoard;