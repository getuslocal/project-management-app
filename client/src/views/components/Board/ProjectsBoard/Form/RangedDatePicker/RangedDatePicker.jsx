import React, { useState } from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './react_dates_overrides.css';
import {
  Container,
  Label,
  Discription
} from './RangedDatePicker.style';

export default function RangedDatePicker({ dateRange, setdateRange }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const { startDate, endDate } = dateRange;

  return (
    <div>
      <Container>
        <Label>Start and due date</Label>
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="startDateMookh" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="endDateMookh" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => setdateRange({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          minimumNights={0}
          displayFormat="MMM DD YYYY"
          required
        />
        <Discription>Allows the planned start and due date for a piece of work to be set.</Discription>
      </Container>
    </div>
  )
}
