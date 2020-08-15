import React from 'react';
import './dashboard.css'

const DashBoard = () => {
  return (
    <div className="board">
      <div className="board-small-content">
        <div className="organization">
          <p>Your organization is : <span><i className="far fa-building"></i> TakayaHoldings.Inc</span></p>
        </div>
        <p className="question-button"><i className="fas fa-question-circle"></i></p>
      </div>

      {/*  */}
      <div className="board-top">
        <div className="board-top-content">
          <h1 className="board-title">DashBoard</h1>
          <div className="small-nav">
            <i className="fas fa-chevron-left"></i>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

        <div className="search-box">
          <i className="fas fa-search" ></i>
          <input type="text" placeholder="Find something" />
        </div>

      </div>

      {/*  */}
      <ul className="board-navigation">
        <li className="active">All projects</li>
        <li>Demo 1</li>
        <li>Demo 2</li>
        <li>Demo 3</li>
      </ul>

      {/*  */}
      <div className="board-content-top">
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
        <div className="ticket-status">
          <p className="ticket-icon"><i className="far fa-chart-bar"></i></p>
          <div className="ticket-content">
            <p className="ticket-number">123</p>
            <p>IN QA</p>
          </div>
        </div>
        <div className="ticket-status">
          <p className="ticket-icon"><i className="fas fa-glass-cheers"></i></p>
          <div className="ticket-content">
            <p className="ticket-number">123</p>
            <p>DONE</p>
          </div>
        </div>


      </div>

    </div>
  )
}

export default DashBoard;