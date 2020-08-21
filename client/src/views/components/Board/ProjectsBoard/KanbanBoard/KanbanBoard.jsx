import React from 'react';

const KanbanBoard = ({ projectInfo, tickets }) => {
  console.log(tickets)
  return (
    <h1>{projectInfo.name}</h1>
  )
}

export default KanbanBoard;