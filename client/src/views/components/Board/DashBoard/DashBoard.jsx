import React from 'react';
import { withRouter } from 'react-router-dom';
import './dashboard.css'
import TopNavigationBar from '../../TopNavigationBar/TopNavigationBar';

const DashBoard = ({ component, baseUrl, ...props }) => {
  // Can get /app/dashboard/:dashboard? variable 
  // @todo: get tickets data based on the dashboard variable. 
  // console.log(props)
  const { dashboard } = props.match.params //  params: {board: 'projects', tab : 'roadmap'}.
  const currentRoute = dashboard ? dashboard : '';

  return (
    <>
      <TopNavigationBar title={component.title} tabs={component.tabs} baseUrl={baseUrl} currentRoute={currentRoute} />
      <div className="board-content-top" >
        <div className="ticket-status">
          <p className="ticket-icon"><i className="fas fa-ticket-alt"></i></p>
          <div className="ticket-content">
            <p className="ticket-number">123</p>
            <p>TO DO</p>
          </div>
        </div>
        <div className="ticket-status">
          <p className="ticket-icon"><i className="fas fa-spinner"></i></p>
          <div className="ticket-content">
            <p className="ticket-number">123</p>
            <p>IN PROGRESS</p>
          </div>
        </div>
        <div className="ticket-status">
          <p className="ticket-icon"><i className="far fa-check-square"></i></p>
          <div className="ticket-content">
            <p className="ticket-number">123</p>
            <p>IN REVIEW</p>
          </div>
        </div>
        {/* <div className="ticket-status">
          <p className="ticket-icon"><i className="far fa-chart-bar"></i></p>
          <div className="ticket-content">
            <p className="ticket-number">123</p>
            <p>IN QA</p>
          </div>
        </div> */}
        <div className="ticket-status">
          <p className="ticket-icon"><i className="fas fa-glass-cheers"></i></p>
          <div className="ticket-content">
            <p className="ticket-number">123</p>
            <p>DONE</p>
          </div>
        </div>
      </div>
    </>
  )
}

// @todo : Get data based on :dashboard variable. Use redux here.

export default withRouter(DashBoard);