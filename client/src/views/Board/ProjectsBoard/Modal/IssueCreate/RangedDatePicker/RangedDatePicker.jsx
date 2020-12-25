import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './react_dates_overrides.css';
import { Container, Label, Discription } from './RangedDatePicker.style';

const RangedDatePicker = ({ dateRange, setDateRange }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const { startDate, endDate } = dateRange;
  return (
    <div>
      <Container>
        <Label>Start and due date*</Label>
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="startDateMookh" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="endDateMookh" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            setDateRange({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          minimumNights={0}
          displayFormat="MMM DD YYYY"
          isOutsideRange={() => false} // Enable choosing dates before today.
          minimumNights={1}
          required
        />
        <Discription>
          Allows the planned start and due date for a piece of work to be set.
          <br />
          <span>
            &#42; An epic must be at least 2 days long. If it is a one day task,
            use calendar instead.
          </span>
        </Discription>
      </Container>
    </div>
  );
};

RangedDatePicker.propTypes = {
  dateRange: PropTypes.object.isRequired,
  setDateRange: PropTypes.func.isRequired,
};

export default RangedDatePicker;
