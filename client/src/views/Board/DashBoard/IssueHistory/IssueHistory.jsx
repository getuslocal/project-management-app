import React, { Component } from 'react'
import { connect } from 'react-redux'

/*
Logs : {
  ticketId: ""
  type: "New"/"Update"
  editor: ""
  field: "Status"/"Summary"/"Description"
  before: "TODO"
  after: "IN REVIEW"
  timestamp
}

TICKET: WHO updates FIELD from PREV to CHANGE , WHEN
TICKET: New ticket is created by WHO, WHEN

*/

export const IssueHistory = () => {
  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueHistory)
