import React, { Component } from 'react'
import {

} from './IssueTypes.style';

export const IssueTypes = () => {
  return (
    <div className="issue-type-cont" >
      <div className="ticket-status">
        <p className="ticket-icon"><i className="fas fa-ticket-alt"></i></p>
        <div className="ticket-content">
          <p className="ticket-number">123</p>
          <p>TASKS</p>
        </div>
      </div>
      <div className="ticket-status">
        <p className="ticket-icon"><i className="fas fa-spinner"></i></p>
        <div className="ticket-content">
          <p className="ticket-number">123</p>
          <p>BUGS</p>
        </div>
      </div>
      <div className="ticket-status">
        <p className="ticket-icon"><i className="far fa-check-square"></i></p>
        <div className="ticket-content">
          <p className="ticket-number">123</p>
          <p>STORIES</p>
        </div>
      </div>
      <div className="ticket-status">
        <p className="ticket-icon"><i className="fas fa-glass-cheers"></i></p>
        <div className="ticket-content">
          <p className="ticket-number">123</p>
          <p>EPICS</p>
        </div>
      </div>
    </div>
  )
}

export default IssueTypes
