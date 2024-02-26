import { useEffect, useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../components/requestmethods';
import { MyCalendar } from '../components/Moment';
import moment from 'moment';
import { RRule} from 'rrule'
import { useUser } from '../components/UserContext';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import closeIcon from '../images/x (1).svg'
import calendarIcon from '../images/calendar (1).svg'
import subjectIcon from '../images/align-left.svg'
import backArrow from '../images/arrow-left.svg'

const Container=styled.div`
    width:95%;
    margin:0 auto;
`
const SubjectModule=styled.div`
    max-width:500px;
    width:100%;
    min-height:190px;
    background-color:#fff;
    border-radius:5px;
    box-shadow: #a5a2a2 0px 4px 8px -2px, #f1eeee 0px 0px 0px 1px;
    border: 1px solid #f1eeee;
    display:flex;
    align-items:baseline;
    justify-content:space-between;
    padding:10px;
    box-sizing:border-box;
`
const SubjectWraper=styled.div`
  width:100%;
  padding:10px;
  box-sizing:border-box;
  position:absolute;
  left:50%;
  top:70%;
  transform:translate(-50%,-50%);
  z-index: 100;
  display:flex;
  justify-content:center;
`
const RemoveButton=styled.div`
    width:30px;
    height:30px;
    border-radius:5px;
    background-color:#f1eeee;
    color:#8b8787;
    display:flex;
    justify-content:center;
    align-items:center;
`
const Icons=styled.div`
    display:flex;
    flex-direction:column;
    margin-left:10px;
`
const LessonIcon=styled.div`
    width:50px;
    height:50px;
    border-radius:5px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:10px;
    background-color:#f1eeee;
    color:#1CA3DE;
`
const Lesson=styled.p`
    margin-left:10px;
    color:#262626;
`
const LessonWraper=styled.div`
    display:flex;
    align-items:center;
`
const BackArrow=styled.div`
    width:100%;
    margin:0 auto;
    height:50px;
    background-color: #fdfbfb;
    margin-top:30px;
    color:#494747;
    border-radius:10px;
    display:flex;
    align-items:center;
    padding-left:10px;
    box-sizing:border-box;
`
const Input=styled.input`
  margin-top:30px;
  outline: none;
  width:200px;
  height: 40px;
  border-radius: 5px;
  padding:5px;
  box-sizing:border-box;
  border:1px solid #1CA3DE;
  &::placeholder {
    color: #262626 ;
    font-family: 'Cormorant Garamond', serif;
    padding-left:5px;
  }
  @media screen and (max-width:485px) {
    width:100%;
  }
`
const Wraper=styled.div`
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    width:100%;
`
const Button=styled.button`
  margin-top:30px;
  width:200px;
  height:40px;
  border-radius:5px;
  background-color:#1CA3DE;
  border:none;
  color:#fff;
  font-family: 'Cormorant Garamond', serif;
  font-family: 'Raleway', sans-serif;
  &:hover{
    background-color:#2c67dd;
    transition:0.5s;
   }
   @media screen and (max-width:485px) {
    width:100%;
  }
`
const Select=styled.select`
  margin-top:30px;
  outline: none;
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border:1px solid #1CA3DE;
  @media screen and (max-width:485px) {
    width:100%;
  }
`
const Option=styled.option`
    
`
const Calendar=styled.div`
    margin-top:30px;
`





export default function Calendars() {
    const nav=useNavigate()
    const handleClick=()=>{
        nav('/')
    }
    const[state,setState]=useState({
        date:'',
        subject:'',
        time:''
    })

    const handleChange=(e:React.ChangeEvent)=>{
        const target = e.target as HTMLInputElement;
        const name=target.name
        const value=target.value
        setState({...state,[name]:value})
    }
       
        
    const [myEventsList, setMyEventsList] = useState([]);
    const timeZoneOffset = moment().utcOffset(); // Get the local time zone offset
    const eventStart = moment(`${state.date} ${state.time}`, 'YYYY-MM-DD HH:mm').utcOffset(timeZoneOffset, true).toDate();
    const eventEnd = moment(eventStart).add(1, 'hour').toDate();


    const subjects= {
        title:state.subject,
        start:new Date(eventStart),
        end:new Date (eventEnd)
    }
   
    const handleAdd=()=>{
        async function fetchData(){
            try{
            await userRequest.post('/calendar',subjects)
            window.location.reload()
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
    }


    useEffect(()=>{
        async function fetchData(){
            try{
            const response=await userRequest.get(`/calendar`)
            setMyEventsList(response.data)            
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
    },[])

    
const events = myEventsList.map(({ start, end, title,_id }) => ({
    title,
    start: new Date(Date.parse(start)),
    end: new Date(Date.parse(end)),
    _id:_id
  }));


    const year2025 = moment('2025-01-01');
    const eventStartDate = events.length > 0 ? events[0].start : new Date(); 

        const rule = new RRule({
            freq: RRule.WEEKLY,
            interval: 1,
            dtstart: eventStartDate,
            until: year2025.toDate(),
            tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });

          const weeklyEvents = rule.all().flatMap((date) =>
          events.map(({ start, end, title,_id }) => ({
            title,
            start: moment(start).add(moment(date).diff(moment(events[0].start))).toDate(),
            end: moment(end).add(moment(date).diff(moment(events[0].start))).toDate(),
            _id   
            }))
          );

      
      const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
      const [selectedEventTitle, setSelectedEventTitle] = useState<React.ReactNode>(null);
      const [selectedDate, setSelectedDate] = useState<Date | string>('');
      interface CustomEvent extends BigCalendarEvent {
        _id: string; 
      } 
      const handleEventClick=(event:CustomEvent)=>{
        const eventId = event._id; 
        const eventTitle = event.title;
        setSelectedEventId(eventId);
        setSelectedEventTitle(eventTitle);
        if (event.start !== undefined) {
          setSelectedDate(event.start);
        } else {
          setSelectedDate('');
        }
      }
      const handleRemove=()=>{
        setSelectedEventId(null);
      }
      const formatDate = (dateString:string|Date) => {
        if(dateString){
          const date = new Date(dateString);
          const options:Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
          return new Intl.DateTimeFormat('en-US',options).format(date);    
        }else{
          return
        }
      }; 

      const handleDelete=(id:string)=>{
        async function fetchData(){
          try{
          await userRequest.delete(`/calendar/${id}`)
          window.location.reload()
          } catch(error){
            console.error('Error fetching data:', error);
          };
        }
          fetchData();
      }

      const{user}=useUser();
  return (
    <Container>
        <BackArrow onClick={handleClick}>
            <img src={backArrow}/>
        </BackArrow>
        {user?.status==='მასწავლებელი'&&<Wraper>
        <Input  name='time' type='time' onChange={(e)=>handleChange(e)}/>
        <Input  name='date' type='date' onChange={(e)=>handleChange(e)}/>
        <Select name='subject' onChange={(e)=>handleChange(e)}>
            <Option>საგანი</Option>
            <Option>ქართული</Option>
            <Option>მათემატიკა</Option>
            <Option>ფიზიკა</Option>
            <Option>ქიმია</Option>
            <Option>ბიოლოგია</Option>
            <Option>გეოგრაფია</Option>
            <Option>ისტორია</Option>
            <Option>ინგლისური</Option>
        </Select>
        <Button onClick={handleAdd}>დამატება</Button>
        </Wraper>}
        <Calendar>
            <MyCalendar myEventsList={weeklyEvents} handleEventClick={handleEventClick} />
      </Calendar>
      {selectedEventId?
      <SubjectWraper>
        <SubjectModule >
          <Icons>
          <LessonWraper>
          <LessonIcon>
              <img src={subjectIcon}/>
          </LessonIcon>
          <Lesson>გაკვეთილი:{selectedEventTitle}</Lesson>
          </LessonWraper>
          <LessonWraper>
          <LessonIcon>
              <img src={calendarIcon}/>
          </LessonIcon>
          <Lesson>{formatDate(selectedDate)}</Lesson>
          </LessonWraper>
          {user?.status==='მასწავლებელი'&&<Button onClick={()=>handleDelete(selectedEventId)}>წაშლა</Button>}
          </Icons>
          <RemoveButton onClick={handleRemove}>
          <img src={closeIcon}/>
          </RemoveButton>          
      </SubjectModule>
      </SubjectWraper>
      :''}
      </Container>
  )
}
