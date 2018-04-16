import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';

BigCalendar.momentLocalizer(moment);

const Calendar = props => (
  
    <BigCalendar
      selectable
      events={props.studySessions}
      defaultView="week"
      startAccessor={((e) => {return new Date(e.start)})}
      endAccessor={((e) => {return new Date(e.end)})}
      onSelectEvent={event => {
        props.viewSessionDetails(event);
        }
      }
      showMultiDayTimes
      defaultDate={new Date()}

    />
  
)

export default Calendar;