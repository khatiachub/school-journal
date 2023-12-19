import  { useEffect, useState } from 'react'
import { subjects } from './data'
import { Link } from 'react-router-dom'
import { publicRequest } from './requestmethods'
import styled from 'styled-components'
import Table from './Table'


const Students=styled.div`
  max-width:600px;
  width:100%;
  margin-top:40px;
  `
const Container = styled.div`
  width: 100%;
  min-height:100vh;
  background-size: cover;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-position:left;
  padding:50px 0px 50px 0px;
`;
const Wraper=styled.div`
  max-width:600px;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items: start;
  margin-top:150px;
`
const SelectWraper=styled.div`
  
`
const Subjectwraper=styled.div`
  display:flex;
  flex-direction:column;
`

const Input = styled.input`
  outline: none;
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin-top:10px;
  border:1px solid #1CA3DE;
  &::placeholder {
    color: #262626 ;
    font-family: 'Cormorant Garamond', serif;
    padding-left:5px;
  }
`;


const Button=styled.button`
  width:200px;
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
const Label=styled.label`
  font-size:15px;
`
export default function Journal() {
const[students,setStudents]=useState([])
    useEffect(()=>{
        async function fetchData(){
            try{
            const response=await publicRequest.get(`/grade`)
            setStudents(response.data);
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
      },[])
     



  const[state,setState]=useState(
    {
    name:'',
    privatenumber:''
  })
  const handleFilter=(e)=>(
    setState({...state,[e.target.name]:e.target.value})
  )

  const addStudent=()=>{
    async function fetchData(){
      try{
      const response=await publicRequest.post(`/student/grade`,state)
      setStudents((prevArray) => [...prevArray, response.data]);
      } catch(error){
        console.error('Error fetching data:', error);
      };
    }
      fetchData();
      setState({...state,name:'',privatenumber:''});

  }
  console.log(students);
  console.log(state.privatenumber);
  
  

  return (
    <Container>
    <Wraper>
    <SelectWraper >
      <Subjectwraper >
      <Label>მოსწავლის პირადი ნომერი</Label>
      <Input value={state.privatenumber} name='privatenumber' onChange={(e)=>handleFilter(e)} type='number' placeholder='private number'/>
      </Subjectwraper>
    </SelectWraper>
    <div style={{display:'flex',flexDirection:'column'}}>
      <Label>მოსწავლის სახელი</Label>
      <Input value={state.name} name='name' onChange={(e)=>handleFilter(e)} type="text" placeholder='Student'/>
      <Button onClick={addStudent}>Add student</Button>
    </div>
    </Wraper>
    <Students>
        <Table 
        students={students}
        setStudents={setStudents}
        state={state}
        />
    </Students>
    </Container>
  )
}