import  { useEffect, useState } from 'react'
import { days, subjects, weeks} from './data'
import { useParams } from 'react-router-dom'
import Table from './Table'
import styled from 'styled-components'
import { publicRequest } from './requestmethods'
import { useUser } from './UserContext'


const Students=styled.div`
  /* max-width:700px; */
  width:100%;
  margin-top:40px;
  display:flex;
  justify-content:center;
  @media screen and (max-width:768px) {
    width:40%;
  }
  
  `

const Select=styled.select`
  border-radius:5px;
  outline:none;
  height:40px;
  border:none;
  /* background-color:#ddd; */
  color:#262626;
  width:150px;
  margin-top:15px;
  padding:5px;
  border:1px solid #1CA3DE;
`
const Option=styled.option`
    border:none;
`
const Label=styled.label`
  color:#333333;
`
const Radio=styled.input`
  
`
const Input=styled.input`
  outline: none;
  width: 150px;
  height: 40px;
  border-radius: 5px;
  &::placeholder {
    color: #fff ;
    font-family: 'Cormorant Garamond', serif;
    padding-left:5px;
  }
  border:1px solid #1CA3DE;

`
const Title=styled.h3`
    
`
const GradeDiv=styled.div`
    max-width:600px;
    width:100%;
    margin-top: 30px;
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    @media screen and (max-width:600px) {
    flex-direction:column;
    justify-content:center;
    align-items:Center;
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
    
`

const Name=styled.p`
  display:flex;
  align-items:center;
  padding:10px;
  box-sizing:border-box;
  &:nth-child(even) {
    background-color: #ddd;
  }
  &:nth-child(odd) {
    background-color:#1CA3DE ;
  }
  max-width:600px;
  width:100%;
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
  margin-top:30vh;
  width:50%;
  justify-content:center;
  align-items:center;
  width: 100%;
`



export default function Studentroom() {
    const[students,setStudents]=useState({})
    const params = useParams<{ id:string}>();
    const{id}=params
    const{studentGrade,studentGrades}=useUser()
    useEffect(()=>{
        async function fetchData(){
            try{
            const response=await publicRequest.get(`/student/${id}/grade`)
            setStudents(response.data);  
            studentGrade(response.data)         
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
      },[])
        

  
  const[state,setState]=useState({
      week:'',
      day:'',
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
    const response=await publicRequest.post(`/student/${id}/grade`,newData)
    setStudents(response.data);  
    console.log(response.data);            
    } catch(error){
      console.error('Error fetching data:', error);
    };
  }
    fetchData();
}
   
  return (
      <Container >
        <Name>Student: <Span>{students?.name}</Span></Name>
        <Name>Id: <Span>{students?.privatenumber}</Span></Name>
    
      <GradeDiv >
      <Select style={{width:100}} name='subject' onChange={(e)=>handleFilter(e)}>
        <Option>Subject</Option>
        {subjects.map((sub)=>(
           <Option   key={sub.subjectId}>{sub.subject}</Option>
           ))}
      </Select>
      <Input type='number'  name='grade' onChange={(e)=>handleFilter(e)} placeholder='Grade'/>
      <Input type='date' name='date' onChange={(e)=>handleFilter(e)} />
      <Label>კი</Label>
      <Radio name='attendance' value='კი' onChange={(e)=>handleFilter(e)} type='radio'/>
      <Label>არა</Label>
      <Radio name='attendance' value='არა' onChange={(e)=>handleFilter(e)} type='radio'/>
      <Button onClick={addGrade}>Add</Button>
      </GradeDiv>
   
    <Students>
     <Table
      students={students}
      name={students.name}
      subject={state.subject}
     />
     </Students>
    </Container>
  )
}

