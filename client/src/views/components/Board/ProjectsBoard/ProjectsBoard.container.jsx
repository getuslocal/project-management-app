import React from 'react';
import ProjectsBoard from './ProjectsBoard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { selectAllProjects } from '../../../../redux/projects/projects.selectors';
import Spinner from '../../../../shared/components/WithSpinner/Spinner';

const ProjectsBoardContainer = ({ projects, ...props }) => {
  return (
    Object.keys(projects).length > 0 ?
      <ProjectsBoard key={props.match.params.project} {...props} />
      :
      <Spinner />
  )
}

const mapStateToProps = createStructuredSelector({
  projects: selectAllProjects,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ProjectsBoardContainer);