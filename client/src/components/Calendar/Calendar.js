import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const myEventsList = [
    {
      id: 0,
      title: 'Board meeting',
      start: new Date(2018, 3, 29, 9, 0, 0),
      end: new Date(2018, 3, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: 'MS training',
      start: new Date(2018, 4, 29, 14, 0, 0),
      end: new Date(2018, 4, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: 'Team lead meeting',
      start: new Date(2018, 4, 28, 8, 30, 0),
      end: new Date(2018, 4, 28, 12, 30, 0),
      resourceId: 3,
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2018, 5, 30, 7, 0, 0),
      end: new Date(2018, 5, 30, 10, 30, 0),
      resourceId: 4,
    },
  ];

const Calendar = props => (
  
    <BigCalendar
      selectable
      events={myEventsList}
      defaultView="month"
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={event => alert(event.title)}
    />
  
)

export default Calendar;