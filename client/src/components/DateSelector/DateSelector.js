import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelector.css';

const DateSelector = props => {

    return <DatePicker
    selected={props.due_date}
    onChange={props.handleGoalDate}
    dateFormat="LL"

/>
}

export default DateSelector;