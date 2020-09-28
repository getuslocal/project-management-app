import React from 'react';
import ProjectsBoard from './ProjectsBoard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { selectIsProjectsLoaded } from '../../../../redux/projects/projects.selectors';
import Spinner from '../../../../shared/components/WithSpinner/Spinner';

const ProjectsBoardContainer = ({ isLoading, ...props }) => {
  return (
    isLoading ?
      <Spinner />
      :
      <ProjectsBoard key={props.match.params.project} {...props} />
  )
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsProjectsLoaded,
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(ProjectsBoardContainer);