import  { useEffect, useState } from 'react'
import { subjects} from './data'
import { useParams } from 'react-router-dom'
import Table from './Table'
import styled from 'styled-components'
import { userRequest } from './requestmethods'
import { useUser } from './UserContext'
import Accordeon from './Accordeon'


const Students=styled.div`
  max-width:950px;
  width:100%;
  margin-top:40px;
  display:flex;
  justify-content:center;
  margin-left:120px;
  @media screen and (max-width:1200px) {
    max-width:700px;
  }
  @media screen and (max-width:900px) {
    max-width:600px;
  }
  @media screen and (max-width:768px) {
    margin-left:0;
  }
  @media screen and (max-width:485px) {
      display:none;
  }
  `

const Select=styled.select`
  border-radius:5px;
  outline:none;
  height:40px;
  width:100px;
  border:none;
  color:#262626;
  margin-top:15px;
  padding:5px;
  box-sizing:border-box;
  border:1px solid #1CA3DE;
  @media screen and (max-width:900px) {
    max-width:600px;
    width:100%;
    margin-top:20px;
    }
`
const Option=styled.option`
    border:none;
`
const Label=styled.label`
  color:#333333;
  margin-top:10px;
`
const Radio=styled.input`
  
`
const Input=styled.input`
  outline: none;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  &::placeholder {
    color: #262626 ;
    font-family: 'Cormorant Garamond', serif;
    padding-left:5px;
  }
  border:1px solid #1CA3DE;
  @media screen and (max-width:900px) {
    max-width:600px;
    width:100%;
    margin-top:20px;
    }

`
const GradeDiv=styled.div`
    max-width:950px;
    width:100%;
    margin-top: 30px;
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    margin-left:120px;
    @media screen and (max-width:1200px) {
    max-width:700px;
  }
    @media screen and (max-width:900px) {
    flex-direction:column;
    justify-content:start;
    align-items:start;
    max-width:600px;
  }
    @media screen and (max-width:768px) {
    margin-left:0;
  }
`
const Button=styled.button`
  width:100px;
  height:40px;
  border-radius:5px;
  background-color:#1CA3DE;
  /* box-shadow: #5293BB 0px 4px 8px -2px, #5293BB 0px 0px 0px 1px; */
  border:none;
  margin-top:10px;
  color:#fff;
  font-family: 'Cormorant Garamond', serif;
  font-family: 'Raleway', sans-serif;
  &:hover{
    background-color:#2c67dd;
    transition:0.5s;
   }
   @media screen and (max-width:900px) {
    max-width:600px;
    width:100%;
    margin-top:10px;
    }
    
`

const Name=styled.p`
  display:flex;
  align-items:center;
  padding:10px;
  box-sizing:border-box;
  &:nth-child(even) {
    background-color:#f7f6f6;  
  }
  &:nth-child(odd) {
    background-color:#1CA3DE ;
  }
  max-width:950px;
  width:100%;
  margin-left:120px;
  @media screen and (max-width:1200px) {
    max-width:700px;
  }
  @media screen and (max-width:900px) {
    max-width:600px;
  }
  @media screen and (max-width:768px) {
    margin-left:0;
  }
`
const Span=styled.span`
  margin-left:10px;  
  color:#fff;
  font-size:20px;
`
const Container=styled.div`
  display:flex;
  flex-direction:column;
  margin:0 auto;
  margin-top:15vh;
  width:50%;
  justify-content:center;
  align-items:center;
  width: 100%;
  padding:10px;
  box-sizing:border-box;
`
const AccordeonWraper=styled.div`
  display:none;
  @media screen and (max-width:485px) {
    display:block;
    max-width:600px;
    width:100%;
  }
`
const AttendWraper=styled.div`
  width:170px;
  justify-content:space-between;
  display:flex;
  padding:10px 0px 10px 0px;
`

interface Students{
  name:string;
  privatenumber:number;
  _id:string;
  subjects:Subjects[]
}
interface Subjects{
  subject:string;
  grades:Grades[];
  _id:string;
}
interface Grades{
  date: string;
  attendance: boolean;
  grade: number;
  _id:string;
}

interface State{
  grade:number|null;
  subject:string;
  attendance:boolean|string;
  date:string
}

export default function Studentroom() {
    const[students,setStudents]=useState<Students>({} as Students)
    
    const params = useParams<{ id:string}>();
    const{id}=params
    const{studentGrade}=useUser()
    useEffect(()=>{
        async function fetchData(){
            try{
            const response=await userRequest.get(`/student/${id}/grade`)
            setStudents(response.data);  
            studentGrade(response.data)             
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
            
      },[])  
      
  const[state,setState]=useState<State>({
      grade:null,
      subject:'',
      date:'',
      attendance:''
    })
  const handleFilter=(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>(
      setState({...state,[e.target.name]:e.target.value})
    )
  const newData = {
    subjects:[
      {
          subject:state.subject,
          grades:[
              {
                  date:state.date,
                  grade:state.grade,
                  attendance:state.attendance==='კი'?true:false
              }
          ]
      }
  ]
  };
const addGrade=()=>{
  async function fetchData(){
    try{
    const response=await userRequest.post(`/student/${id}/grade`,newData)
    setStudents(response.data);  
    window.location.reload()

    } catch(error){
      console.error('Error fetching data:', error);
    };
  }
    fetchData();
}
  return (
      <Container >
        <Name>მოსწავლე: <Span>{students?.name}</Span></Name>
        <Name>აიდი: <Span>{students?.privatenumber}</Span></Name>
    
      <GradeDiv >
      <Select  name='subject' onChange={(e)=>handleFilter(e)}>
        <Option>საგანი</Option>
        {subjects.map((sub)=>(
           <Option   key={sub.subjectId}>{sub.subject}</Option>
           ))}
      </Select>
      <Input type='number'  name='grade' onChange={(e)=>handleFilter(e)} placeholder='ქულა'/>
      <Input type='date' name='date' onChange={(e)=>handleFilter(e)} />
      <AttendWraper>
      <Label >დასწრება:</Label>
      <div style={{display:'flex'}}>
      <div style={{display:'flex'}}>
      <Label>კი</Label>
      <Radio style={{marginTop:10,marginLeft:5}} name='attendance' value='კი' onChange={(e)=>handleFilter(e)} type='radio'/>
      </div>
      <div style={{display:'flex',marginLeft:10}}>
      <Label>არა</Label>
      <Radio style={{marginTop:10,marginLeft:5}} name='attendance' value='არა' onChange={(e)=>handleFilter(e)} type='radio'/>
      </div>
      </div>
      </AttendWraper>
      <Button onClick={addGrade}>დამატება</Button>
      </GradeDiv>
   
    <Students>
     <Table
      students={students}
      name={students.name}
      subject={state.subject}
      state={state}
      setState={setState}
     />
     </Students>
     <AccordeonWraper>
      <Accordeon 
       accordstudents={students}
       subject={state.subject}
      />
     </AccordeonWraper>
    </Container>
  )
}

