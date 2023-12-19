import React, { useEffect, useState } from 'react'
import { publicRequest } from '../components/requestmethods'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useUser } from '../components/UserContext';


const Th=styled.th`
  text-align: left;
  padding: 20px;
  color:#fff;
  border-left: 1px solid #fff;
  background-color:#1CA3DE;
  font-family: 'Cormorant Garamond', serif;
  font-family: 'Raleway', sans-serif;
  height:40px;

`
const Td=styled.td`
    text-align: left;
    border: 1px solid #f1eeee;
    border-left:none;
    border-top:none;
    padding:20px;
    position: relative;
    height:40px;
    color:#333333;
`

const Table=styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 60%;
    background-color:#fff;
    box-shadow: #cac5c5 2px 4px 8px ;
    margin:0 auto;
    margin-top:60vh;
`
const TeacherWraper=styled.div`
  width:85%;
  height:30px;
  background-color:#e0dada;
  border-radius:10px;
  padding:20px;
  color:#fff;
  margin-top:40px;;
  display:flex;
`
const SubjectsWraper=styled.div`
  width:85%;
  height:15px;
  background-color:#e0dada;
  border-radius:10px;
  padding:20px;
  color:#fff;
`
const Wraper=styled.div`
  width:100%;
  padding-right:30px;
  padding-left:30px;
  display:flex;
  flex-direction:column;
  align-items:end;
  justify-content:flex-end;
  box-sizing:border-box;
  margin-top:20vh;
`
const Tr=styled.tr`
   &:nth-child(odd) {
    background-color: #f2f2f2;
    border: 1px solid #fff;
  }
`







export default function Subject() {
  const params = useParams<{ id:string}>();
  const[students,setStudents]=useState([])
  const[id,setId]=useState([])
  const{user}=useUser()
  console.log(user);
  
  useEffect(()=>{
    async function fetchData(){
        try{
        const response=await publicRequest.get('/grade')
        setId(response.data);  
                  
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
  },[])

  console.log(id);
  const filteredId=id.filter((id)=>(id.privatenumber==user.privatenumber))


  const filteredSubject=filteredId&&filteredId.map((id)=>(id.subjects.filter((subject)=>(subject.subject===params.sub))))
  console.log(filteredSubject);
 
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US').format(date);
  };

  
  
  return (
    <div>
      <Wraper>
      <SubjectsWraper>საგნები</SubjectsWraper>
      <TeacherWraper>
        <p>წლიური შფასება:</p>
        <p>მიმდინარე შეფასება:</p>
        <p>დასწრება:</p>
        <input type='date'/>
      </TeacherWraper>
      </Wraper>
      <Table>
        <thead>
          <tr>
            <Th>გაკვეთილი</Th>
            <Th>დასწრება</Th>
            <Th>შეფასება</Th>
          </tr>
        </thead>
        <tbody>
            {filteredSubject&&filteredSubject.map((subject)=>(subject.map((subject)=>(subject.grades.map((grade)=>(
               <Tr>
               <Td>{formatDate(grade.date)}</Td>
               <Td>{grade.attendance?'დიახ':'არა'}</Td>
               <Td>{grade.grade}</Td>
               </Tr>
            ))))))}
        </tbody>
      </Table>
    </div>
  )
}
