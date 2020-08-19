import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'

const Demo1 = () => (
  <h1>Demo1</h1>
)
const ProjectsBoard = ({...props}) => {
  console.log(props.match)
  return (
    <div style={{ height: '100%', background: 'whitesmoke' }}>
      <h1>ProjectsBoard</h1>
      <Switch>
        <Route exact path={`${props.match.url}/`} component={Demo1} />
      </Switch>
    </div>
  )
}

export default withRouter(ProjectsBoard);