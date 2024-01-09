import { Calendar, momentLocalizer,View} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styled from 'styled-components'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useEffect, useState } from 'react'


const localizer = momentLocalizer(moment)

const CalendarStyle = styled(Calendar)`


.rbc-time-view {
    margin-top: 20px;
    border-radius: 10px;
}
  
.rbc-header {
  color: #fff; 
  font-size: 14px;
  height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:#1CA3DE;
}
.rbc-time-view .rbc-header{
  color: #fff; 
  display:flex;
  align-items:center;
  justify-content:center;
  border-bottom:none;
  z-index:10;
}
.rbc-time-header{
  height:60px;
}

.rbc-time-view .rbc-day-slot {
  background-color: #fff; 
}

.rbc-time-view .rbc-timeslot-group {
  min-height: 50px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding-top:15px;
}
.rbc-month-view{
  margin-top:20px;
  border-radius:10px;
}

  .rbc-event {
    background-color: #1CA3DE;
    color: #fff;
    border: 1px solid #ffffff;
    border-radius: 4px;
    height: 40px;
    display:flex;
    box-sizing:border-box;
    align-items:center;
    justify-content:center;
    text-align:center;
    padding:5px;
  }
  .rbc-time-view .rbc-event{
    @media screen and (max-width:1115px) {
      /* justify-content:start; */
      height:auto;
      font-size:12px;
      align-items:start;
    }
  }
  .day-view-header {
    background-color: #3498db; /* Set your desired background color */
    color: #fff; /* Set text color to make it readable */
    padding: 10px; /* Add padding for better appearance */
    text-align: center; /* Center the text */
    font-size: 18px; /* Adjust font size as needed */
    font-weight: bold; /* Make the text bold */
}

.calendar::-webkit-scrollbar {
  width: 12px; /* Set the width of the scrollbar for WebKit browsers (Chrome, Safari, etc.) */
}

.calendar::-webkit-scrollbar-thumb {
  background-color: #3498db; /* Set the color of the scrollbar thumb */
  border-radius: 6px; /* Set the border radius of the scrollbar thumb */
}

.calendar::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Set the color of the scrollbar track */
}
`;




const Arrow=styled.div`
  width:40px;
  height:40px;
  border-radius:10px;
  border:1px solid #dddada;
  display:flex;
  justify-content:center;
  align-items:center;
  color:#a8a6a6;
  &:hover{
    background-color: #1CA3DE;
    transition:0.5s;
    color:#fff;
  }
`
const Day=styled.div`
  width:60px;
  height:40px;
  border-radius:10px;
  background-color: #1CA3DE;
  display:flex;
  justify-content:center;
  align-items:center;
  color:#fff;
  &:hover{
    background-color:#28b3ee;
    transition:0.5s;
  }

`
const Wraper=styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 10px;
    background-color: #fdfbfb;
    border-bottom: 1px solid #ddd;
    border-radius:10px;
    /* margin-top:20px; */
`
interface ButtonProps {
  active?: boolean;
};
const Button=styled.button<ButtonProps>`
    color: #262626;
    cursor: pointer;
    padding:10px;
    width:80px;
    border:none;
    box-sizing:border-box;
    background-color: ${({ active }) => (active ?'#1CA3DE':' #fdfbfb')};
    border-radius:${({ active }) => (active &&'10px')};
    border:${({ active }) => (active &&'1px solid #d3d5d6')};
    color:${({ active }) => (active &&'#fff')};
    &:nth-child(1){
      border-top-left-radius:10px;
      border-bottom-left-radius:10px;
    }
    &:nth-child(3){
      border-top-right-radius:10px;
      border-bottom-right-radius:10px;
    }
   
      @media screen and (max-width: 768px) {
        display:none;
      }
`

const ArrowBox=styled.div`
  display:flex;
  width:55%;
  justify-content:space-between;
  align-items:Center;
  @media screen and (max-width:768px) {
    width:100%;
  }
`
const ArrowWraper=styled.div`
  display:flex;
  width:180px;
  justify-content:space-between;
  align-items:Center;
`
const ButtonBox=styled.div`
  width:200px;
  border:1px solid #e7e5e5;
  border-radius:10px;
  display:flex;
  @media screen and (max-width:768px) {
    display:none;
  }
`
const Span=styled.span`
  font-size:27px;
  line-height:1.5px;
  color:#4e4e4e;
  @media screen and (max-width:485px) {
    font-size:20px;
  }
`
const Container=styled.div`
  /* margin-top:50px; */
`


interface MyCalendarProps {
  myEventsList: any[]; 
  handleEventClick: (event: any, e: React.SyntheticEvent) => void; 
}

export const MyCalendar:React.FC<MyCalendarProps> = (props) => {
  
  const [view, setView] = useState<View>('month');
  const[desktop,setDesktop]=useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 485) {
        setView('day');
      } else if (width <= 768) {
        setView('week');
      } else {
        setView('month');
        setDesktop(true);
      }
      if (width <= 768) {
        setDesktop(false); 
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial view based on screen width

    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  }, []);
let formats = {
  timeGutterFormat: 'HH:mm',
}

  
 return(
 <Container>
  {desktop?
  <CalendarStyle
  className="container"
  localizer={localizer}
  events={props.myEventsList}
  startAccessor="start"
  endAccessor="end"
  views={ ['day', 'week', 'month']}
  style={{ height: 700 }}
  onSelectEvent={props.handleEventClick}
  components={{
    toolbar:CustomToolbar,
    
  }}
/>:(
    <CalendarStyle
      localizer={localizer}
      events={props.myEventsList}
      startAccessor="start"
      endAccessor="end"
      view={view}
      style={{ height: 700 }}
      onSelectEvent={props.handleEventClick}
      components={{
        toolbar:CustomToolbar,
        
      }}
      formats={formats}
    />)}
  </Container>
  )
}
const CustomToolbar: React.FC<any> = (toolbarProps) => {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  
  const [activeView, setActiveView] = useState('month');
  const handleButtonClick = (view:string) => {
    setActiveView(view);
    toolbarProps.onView(view);
  };
  return(
  <Wraper>
    <ArrowBox>
      <Span>{formattedCurrentDate}</Span>
      <ArrowWraper>
    <Arrow onClick={() => toolbarProps.onNavigate('PREV')}>
      <ArrowBackIosOutlinedIcon />
    </Arrow>
    <Day onClick={() => toolbarProps.onNavigate('TODAY')}>დღეს</Day>
    <Arrow onClick={() => toolbarProps.onNavigate('NEXT')}>
      <ArrowForwardIosOutlinedIcon />
    </Arrow>
    </ArrowWraper>
    </ArrowBox>
    <ButtonBox>
     <Button
        active={activeView === 'month'}
        onClick={() => handleButtonClick('month')}
      >
        თვე
      </Button>
      <Button
        active={activeView === 'week'}
        onClick={() => handleButtonClick('week')}
      >
        კვირა
      </Button>
      <Button
        active={activeView === 'day'}
        onClick={() => handleButtonClick('day')}
      >
        დღე
      </Button>
    </ButtonBox>
  </Wraper>
  )
};