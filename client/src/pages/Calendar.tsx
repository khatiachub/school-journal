import { useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useNavigate } from 'react-router-dom';
import { publicRequest, userRequest } from '../components/requestmethods';
import { MyCalendar } from '../components/Moment';
import moment from 'moment';
import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'
import { useUser } from '../components/UserContext';


const Container=styled.div`
    width:95%;
    margin:0 auto;
`




const SubjectModule=styled.div`
    max-width:500px;
    width:100%;
    height:230px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background-color:#fff;
    border-radius:5px;
    box-shadow: #a5a2a2 0px 4px 8px -2px, #f1eeee 0px 0px 0px 1px;
    border: 1px solid #f1eeee;
    z-index:100 ;
    display:flex;
    align-items:baseline;
    justify-content:space-between;
    padding-right:10px;
`
const RemoveButton=styled.div`
    position:absolute;
    width:30px;
    height:30px;
    border-radius:5px;
    background-color:#f1eeee;
    color:#8b8787;
    display:flex;
    justify-content:center;
    align-items:center;
    top:10px;
    right:10px;
`
const Icons=styled.div`
    display:flex;
    flex-direction:column;
    margin-top:30px;
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
const GroupWraper=styled.div`
    display:flex;
    align-items:center;
`
const Group=styled.p`
    margin-left:10px;
    color:#262626;
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
            const response=await userRequest.post('/calendar',subjects)
            console.log(response.data);
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

      
      const [selectedEventId, setSelectedEventId] = useState(null);
      const [selectedEventTitle, setSelectedEventTitle] = useState(null);
      const[selectedDate,setSelectedDate]=useState(null)
      const handleEventClick=(event)=>{
        const eventId = event._id; // Assuming 'id' is the property containing the event ID
        const eventTitle = event.title; // Assuming 'title' is the property containing the event title
        setSelectedEventId(eventId);
        setSelectedEventTitle(eventTitle);
        setSelectedDate(event.start)        
      }
      const handleRemove=()=>{
        setSelectedEventId(null);
      }
      const formatDate = (dateString:string) => {
        if(dateString){
          const date = new Date(dateString);
          const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
          return new Intl.DateTimeFormat('en-US',options).format(date);    
        }else{
          return
        }
      }; 

      const handleDelete=(id:string)=>{
        async function fetchData(){
          try{
          const response=await userRequest.delete(`/calendar/${id}`)
          console.log(response.data);
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
            <ArrowBackIosOutlinedIcon/>
        </BackArrow>
        {user?.status==='მასწავლებელი'&&<Wraper>
        <Input  name='time' type='time' onChange={(e)=>handleChange(e)}/>
        <Input  name='date' type='date' onChange={(e)=>handleChange(e)}/>
        <Select name='subject' onChange={(e)=>handleChange(e)}>
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
        <SubjectModule >
          <RemoveButton onClick={handleRemove}>
          <ClearOutlinedIcon/>
          </RemoveButton>
          <Icons>
          <LessonWraper>
          <LessonIcon>
              <SubjectOutlinedIcon/>
          </LessonIcon>
          <Lesson>გაკვეთილი:{selectedEventTitle}</Lesson>
          </LessonWraper>
          <LessonWraper>
          <LessonIcon>
              <CalendarTodayOutlinedIcon/>
          </LessonIcon>
          <Lesson>{formatDate(selectedDate)}</Lesson>
          </LessonWraper>
          <GroupWraper>
          <LessonIcon>
              <GroupOutlinedIcon/>
          </LessonIcon>
          <Group>მონაწილეები:</Group>
          </GroupWraper>
          </Icons>
          {user?.status==='მასწავლებელი'&&<Button onClick={()=>handleDelete(selectedEventId)}>წაშლა</Button>}
      </SubjectModule>
      :''}
      </Container>
  )
}
