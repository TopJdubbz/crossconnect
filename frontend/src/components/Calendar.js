import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
});

export default function CalendarComponent({ events = [], ...props }) {
  const [date, setDate] = useState(() => new Date());
  const [view, setView] = useState('month');

  return (
    <Calendar
      localizer={localizer}
      events={events}
      date={date}
      onNavigate={setDate}
      view={view}
      onView={setView}
      startAccessor="start"
      endAccessor="end"
      titleAccessor="title"
      style={{ height: 500 }}
      {...props}
    />
  );
}
