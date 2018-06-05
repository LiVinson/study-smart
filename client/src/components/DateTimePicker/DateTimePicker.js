import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.css';

const DateTimePicker = props =>  {
//     constructor (props) {
//       super(props)
//       this.state = {
//         startDate: moment()
//       };
//       this.handleChange = this.handleChange.bind(this);
//     }
   
//     handleChange(date) {
//       this.setState({
//         startDate: date
//       });
//     }
   
//     render() {
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