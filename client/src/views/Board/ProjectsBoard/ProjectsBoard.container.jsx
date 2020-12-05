import React, { useEffect, useState } from 'react';
import ProjectsBoard from './ProjectsBoard';
import { createStructuredSelector } from 'reselect'
import { getTicketsByProjectId } from '../../../redux/tickets/tickets.actions';
import { setCurrentProjectId } from '../../../redux/projects/projects.actions';
import { connect } from 'react-redux';
import { selectProjectById } from '../../../redux/projects/projects.selectors';
import Spinner from '../../../shared/components/WithSpinner/Spinner';

const ProjectsBoardContainer = ({
  project,
  getTicketsByProjectId,
  setCurrentProjectId,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      await getTicketsByProjectId(project._id);
      await setCurrentProjectId(project._id);
      setIsLoading(false)
    }
    fetchTickets();
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
});

export default connect(mapStateToProps, { getTicketsByProjectId, setCurrentProjectId })(ProjectsBoardContainer);
