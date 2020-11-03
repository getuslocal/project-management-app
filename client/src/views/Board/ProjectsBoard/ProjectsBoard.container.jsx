import React, { useEffect } from 'react';
import ProjectsBoard from './ProjectsBoard';
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { getTicketsByProjectId } from '../../../redux/tickets/tickets.actions';
import { setCurrentProjectId } from '../../../redux/projects/projects.actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectIsTicketsLoaded } from '../../../redux/tickets/tickets.selectors';
import { selectProjectById } from '../../../redux/projects/projects.selectors';
import Spinner from '../../../shared/components/WithSpinner/Spinner';

const ProjectsBoardContainer = ({
  project,
  isLoading,
  getTicketsByProjectId,
  setCurrentProjectId,
  ...props
}) => {
  useEffect(() => {
    getTicketsByProjectId(project._id)
    setCurrentProjectId(project._id)
  }, []);

  return (
    isLoading ?
      <Spinner />
      :
      <ProjectsBoard key={props.match.params.tab} project={project} {...props} />
  )
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.match.params.project),
  isLoading: selectIsTicketsLoaded,
});

export default connect(mapStateToProps, { getTicketsByProjectId, setCurrentProjectId })(ProjectsBoardContainer);
