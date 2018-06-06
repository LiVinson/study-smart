import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.css';

const DateTimePicker = props =>  {
      return <DatePicker
          selected={props.timeframe}
          onChange={props.handleChange}
          showTimeSelect
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="Time"
      />
  }

  export default DateTimePicker;