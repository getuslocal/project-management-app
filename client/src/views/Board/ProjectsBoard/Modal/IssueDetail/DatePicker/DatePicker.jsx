import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { Container, Label } from './DatePicker.style';

export default function DatePicker({
  dateRange,
  updateTicketField,
  isStartDate,
  isEndDate,
  updateTicketHistory,
}) {
  const [focused, setFocused] = useState(false);
  const momentedStartDate = moment(dateRange.startDate);
  const momentedEndDate = moment(dateRange.endDate);

  const handleDateChange = (updatedDateRange) => {
    updateTicketField({ field: 'dateRange', value: updatedDateRange });
    if (isStartDate) {
      updateTicketHistory(
        'Start Date',
        momentedStartDate.format('LL'),
        updatedDateRange.startDate.format('LL')
      );
    } else if (isEndDate) {
      updateTicketHistory(
        'Due Date',
        momentedEndDate.format('LL'),
        updatedDateRange.endDate.format('LL')
      );
    }
  };

  return (
    <div>
      <Container>
        <Label>
          {isStartDate && 'Start'}
          {isEndDate && 'Due'} date
        </Label>
        {isStartDate && (
          <SingleDatePicker
            displayFormat="MMMM DD, YYYY"
            date={momentedStartDate} // momentPropTypes.momentObj or null
            onDateChange={(date) =>
              handleDateChange({ ...dateRange, startDate: date })
            } // PropTypes.func.isRequired
            focused={focused} // PropTypes.bool
            onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
            id="single_date_picker_start" // PropTypes.string.isRequired,
            required
            isOutsideRange={(day) => day.isSameOrAfter(momentedEndDate)}
          />
        )}
        {isEndDate && (
          <SingleDatePicker
            displayFormat="MMMM DD, YYYY"
            date={momentedEndDate} // momentPropTypes.momentObj or null
            onDateChange={(date) =>
              handleDateChange({ ...dateRange, endDate: date })
            } // PropTypes.func.isRequired
            focused={focused} // PropTypes.bool
            onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
            id="single_date_picker_end" // PropTypes.string.isRequired,
            required
            isOutsideRange={(day) =>
              day.isSameOrBefore(moment(momentedStartDate))
            }
          />
        )}
      </Container>
    </div>
  );
}
