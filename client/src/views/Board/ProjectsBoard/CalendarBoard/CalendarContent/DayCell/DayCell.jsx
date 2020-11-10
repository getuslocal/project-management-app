import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import {
  Container,
  Content,
  Header,
  QuickAddButton,
} from './DayCell.style';

const DayCell = ({ momentDate, currentMonth }) => {
  return (
    <Container
      isViewed={momentDate.isSame(currentMonth, 'month')}
      isToday={momentDate.isSame(moment(), 'day', 'month')}
    >
      <Content>
        <Header>
          {momentDate.format('D') == 1 && momentDate.format('MMM')}
          {momentDate.format('D')}
          <QuickAddButton
            className="icon-plus quick-add-button"
          // onClick={() => {
          //   setIsModalOpen(true)
          //   setDefaultStartDate(moment(new Date(yyyy, mm, dd)))
          // }}
          />
        </Header>
      </Content>
    </Container>
  )
}

DayCell.propTypes = {

}

export default DayCell