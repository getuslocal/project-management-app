import React from 'react';
import ProjectsBoard from './ProjectsBoard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom'

const ProjectsBoardContainer = ({ projects, ...props }) => {
  return (
    Object.keys(projects).length > 0 ?
      <ProjectsBoard key={props.match.params.project} {...props} />
      :
      <p>...Loading</p>
  )
}

/// @todo: turn these to selectors.
const mapStateToProps = state => ({
  projects: state.projects,
});

// export default connect(mapStateToProps)(ProjectsBoardContainer);
export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ProjectsBoardContainer);