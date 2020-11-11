import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import './react_date_overrides.css';
import {
  Label,
} from './SingleDatePicker.style';

const SingleDatePickerComponent = ({
  displayFormat,
  momentedDate,
  onDateChange,
  disableBefore,
  disableAfter,
  label,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div {...props}>
      {label && <Label>{label}</Label>}
      <SingleDatePicker
        displayFormat={displayFormat}
        date={momentedDate} // momentPropTypes.momentObj or null
        onDateChange={date => onDateChange(date)} // PropTypes.func.isRequired
        focused={focused} // PropTypes.bool
        onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
        id="single_date_picker_start" // PropTypes.string.isRequired,
        isOutsideRange={day => {
          if (!disableBefore || !disableAfter) return;
          return (day.isAfter(disableAfter, 'day') || day.isBefore(disableBefore, 'day'))
        }}
      />
    </div>
  )
}

SingleDatePickerComponent.propTypes = {
  displayFormat: PropTypes.string,
  momentedDate: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  disableBefore: PropTypes.object,
  disableAfter: PropTypes.object,
  label: PropTypes.string,
}

SingleDatePickerComponent.defaultProps = {
  disableBefore: undefined,
  disableAfter: undefined,
  displayFormat: "MMMM DD, YYYY",
  momentedDate: null,
  onDateChange: () => { },
  label: undefined,
};;


export default SingleDatePickerComponent
