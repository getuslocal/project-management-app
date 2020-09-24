import React, { useState } from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import './single_date_picker_overrides.css';
import {
  FormContainer,
  Label,
} from '../Form.style';

export default function DatePicker({ dateRange, handleDateChange, isStartDate, isEndDate }) {
  const [focused, setFocused] = useState(false);
  const { startDate, endDate } = dateRange;

  return (
    <div>
      <FormContainer>
        <Label>
          {isStartDate && 'Start'}
          {isEndDate && 'Due'}
          {' '}date
        </Label>
        {
          isStartDate &&
          <SingleDatePicker
            displayFormat="MMMM DD, YYYY"
            date={startDate} // momentPropTypes.momentObj or null
            onDateChange={date => handleDateChange({ ...dateRange, startDate: date })} // PropTypes.func.isRequired
            focused={focused} // PropTypes.bool
            onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            required
            isOutsideRange={day => (day.isAfter(endDate))}
          />
        }
        {
          isEndDate &&
          <SingleDatePicker
            displayFormat="MMMM DD, YYYY"
            date={endDate} // momentPropTypes.momentObj or null
            onDateChange={date => handleDateChange({ ...dateRange, endDate: date })} // PropTypes.func.isRequired
            focused={focused} // PropTypes.bool
            onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            required
            isOutsideRange={day => (day.isBefore(startDate))}
          />
        }
      </FormContainer>
    </div>
  )
}
