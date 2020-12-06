import React, { useEffect, useState } from 'react';
import ProjectsBoard from './ProjectsBoard';
import { createStructuredSelector } from 'reselect'
import { getTicketsByProjectId } from '../../../redux/tickets/tickets.actions';
import { setCurrentProjectId } from '../../../redux/projects/projects.actions';
import { connect } from 'react-redux';
import { selectProjectById } from '../../../redux/projects/projects.selectors';
import Spinner from '../../../shared/components/WithSpinner/Spinner';
import { selectUser } from '../../../redux/auth/auth.selectors';
import AccessDenied from './AccessDenied/AccessDenied';

const ProjectsBoardContainer = ({
  project,
  getTicketsByProjectId,
  setCurrentProjectId,
  currentUser: { _id: currentUserId },
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Check if the current user is a member of the project.
  const isMember = project.members.includes(currentUserId);

  useEffect(() => {
    const fetchTickets = async () => {
      await getTicketsByProjectId(project._id);
      await setCurrentProjectId(project._id);
      setIsLoading(false)
    }
    fetchTickets();
  }, []);

  if (!isMember) {
    return <AccessDenied {...props} />
  }

  return (
    isLoading ?
      <Spinner />
      :
      <ProjectsBoard key={props.match.params.tab} project={project} {...props} />
  )
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  project: selectProjectById(ownProps.match.params.project),
  currentUser: selectUser
});

export default connect(mapStateToProps, { getTicketsByProjectId, setCurrentProjectId })(ProjectsBoardContainer);
