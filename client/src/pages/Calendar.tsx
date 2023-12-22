import { useEffect, useState} from 'react'
import styled from 'styled-components'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../components/requestmethods';
import { MyCalendar } from '../components/Moment';
import moment from 'moment';



const Container=styled.div`
    
`




const SubjectModule=styled.div`
    max-width:450px;
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
    width:95%;
    margin:0 auto;
    height:50px;
    background-color:#f3f1f1;
    margin-top:30px;
    color:#fff;
    border-radius:10px;
    display:flex;
    align-items:center;
    padding-left:10px;
    box-sizing:border-box;
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
    const eventStart = moment(`${state.date} ${state.time}`, 'YYYY-MM-DD HH:mm').toDate();
    const eventEnd = moment(eventStart).add(1, 'hour').toDate(); // Assuming events last for 1 hour
    const subjects= {
        title:state.subject,
        start:new Date(eventStart),
        end:new Date (eventEnd)
    }
   
    const handleAdd=()=>{
        async function fetchData(){
            try{
            const response=await publicRequest.post('/calendar',subjects)
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
            const response=await publicRequest.get(`/calendar`)
            setMyEventsList(response.data)            
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
      },[])


      const events = myEventsList.map(({start, end,title}) =>
      ({
        title,
        start: new Date(Date.parse(start)),
        end: new Date(Date.parse(end)),
       })
      );
      

      const[selected,setSelected]=useState(false)
      const handleEventClick=()=>{
        setSelected(true)
      }
      const handleRemove=()=>{
        setSelected(false)
      }

      const eventStyleGetter=()=>{
        const backgroundColor='red'
        return {
            style: {
              backgroundColor,
            },
          };
      }
  return (
    <Container>
        <BackArrow onClick={handleClick}>
            <ArrowBackIosOutlinedIcon/>
        </BackArrow>
        <input  name='time' type='time' onChange={(e)=>handleChange(e)}/>
        <input  name='date' type='date' onChange={(e)=>handleChange(e)}/>
        <select name='subject' onChange={(e)=>handleChange(e)}>
            <option>ქართული</option>
            <option>მათემატიკა</option>
            <option>ფიზიკა</option>
            <option>ქიმია</option>
            <option>ბიოლოგია</option>
            <option>გეოგრაფია</option>
            <option>ისტორია</option>
            <option>ინგლისური</option>
        </select>
        <button onClick={handleAdd}>დამატება</button>
      <MyCalendar myEventsList={events} handleEventClick={handleEventClick} eventStyleGetter={eventStyleGetter}/>


      {selected?<SubjectModule>
            <RemoveButton onClick={handleRemove}>
            <ClearOutlinedIcon/>
            </RemoveButton>
            <Icons>
            <LessonWraper>
            <LessonIcon>
                <CalendarTodayOutlinedIcon/>
            </LessonIcon>
            <Lesson>გაკვეთილი:</Lesson>
            </LessonWraper>
            <LessonIcon>
                <SubjectOutlinedIcon/>
            </LessonIcon>
            <GroupWraper>
            <LessonIcon>
                <GroupOutlinedIcon/>
            </LessonIcon>
            <Group>მონაწილეები:</Group>
            </GroupWraper>
            </Icons>
        </SubjectModule>:''}
      </Container>
  )
}
