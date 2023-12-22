import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = momentLocalizer(moment)


interface MyCalendarProps {
  myEventsList: any[]; // Adjust the type based on the actual type of your events
  handleEventClick: (event: any, e: React.SyntheticEvent) => void; // Corrected type
  // eventStyleGetter?: (event: any, start: string, end: string, isSelected: boolean) => React.CSSProperties;
}

export const MyCalendar:React.FC<MyCalendarProps> = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={props.myEventsList}
      startAccessor="start"
      endAccessor="end"
      views={['week', 'month']} // Specify both 'week' and 'month' views
      style={{ height: 500 }}
      onSelectEvent={props.handleEventClick}
      // eventStyleGetter={props.eventStyleGetter}
    />
  </div>
)