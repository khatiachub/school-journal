import  { useEffect, useState } from 'react'
import { publicRequest } from './requestmethods'
import styled from 'styled-components'
import Table from './Table'


const Students=styled.div`
  max-width:600px;
  width:100%;
  margin-top:40px;
  margin-left:100px;
  @media screen and (max-width:768px) {
    margin-left:0;
  }
  `
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content:end;
  padding:30px;
  box-sizing:border-box;
  margin:0 auto;
  @media screen and (max-width:768px) {
    padding:10px;
  }
`
const Wraper=styled.div`
  max-width:600px;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items: start;
  margin-top:150px;
  margin-left:100px;
  @media screen and (max-width:768px) {
    margin-left:0;
  }
  @media screen and (max-width:485px) {
    flex-direction:column;
  }
`
const SelectWraper=styled.div`
  display:flex;
  flex-direction:column;
  @media screen and (max-width:485px) {
    max-width:600px;
    width:100%;
  }
`
const Subjectwraper=styled.div`
  display:flex;
  flex-direction:column;
  @media screen and (max-width:485px) {
    max-width:600px;
    width:100%;
  }
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
  @media screen and (max-width:485px) {
    max-width:600px;
    width:100%;
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
   @media screen and (max-width:485px) {
    max-width:600px;
    width:100%;
  }
  
`
const Label=styled.label`
  font-size:15px;
  margin-top:10px;
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
export default function Journal() {
const[students,setStudents]=useState<Students[]>([])
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
  const handleFilter=(e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>(
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
  

  return (
    <Container>
    <Wraper>
      <Subjectwraper >
      <Label>მოსწავლის პირადი ნომერი</Label>
      <Input value={state.privatenumber} name='privatenumber' onChange={(e)=>handleFilter(e)} type='number' placeholder='private number'/>
      </Subjectwraper>
    <SelectWraper >
      <Label>მოსწავლის სახელი</Label>
      <Input value={state.name} name='name' onChange={(e)=>handleFilter(e)} type="text" placeholder='Student'/>
      <Button onClick={addStudent}>Add student</Button>
    </SelectWraper>
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