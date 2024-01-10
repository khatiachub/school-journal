import { useEffect, useState } from 'react'
import { userRequest } from '../components/requestmethods'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useUser } from '../components/UserContext';
import Accordeon from '../components/Accordeon';
import arrowBack from '../images/arrow-left.svg'




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
    border: 1px solid #e4e0e0;
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
    max-width: 1000px;
    width:100%;
    background-color:#fff;
    box-shadow: #cac5c5 2px 4px 8px ;
    margin-left:120px;
    margin-top:50px;
    @media screen and (max-width:1200px) {
    margin-left:120px;
    max-width:600px;
  }
    @media screen and (max-width:768px) {
    margin-left:0;
  }
    @media screen and (max-width:485px) {
    display:none;
  }
`
const AccordeonWraper=styled.div`
  display:none;
  @media screen and (max-width:485px) {
    display:block;
    max-width:600px;
    width:100%;
  }
`
const TeacherWraper=styled.div`
  width:100%;
  height:auto;
  background-color:#f7f6f6;  
  border-radius:10px;
  padding:20px;
  color:#424141;
  margin-top:40px;;
  display:flex;
  justify-content:space-between;
  align-items:start;
  box-sizing:border-box;
  @media screen and (max-width:600px) {
    background-color:#fff;
    height:auto;
    color:#262626;
    padding:0;
  }
  @media screen and (max-width:380px) {
  align-items:end;
  }
`

const GradeTitle=styled.div`
display:flex;
max-width:160px;
width:100%;
align-items:center;
justify-content:space-between;
 @media screen and (max-width:600px) {
  margin-top:20px;
  }
  @media screen and (max-width:380px) {
  flex-direction:column;
  justify-content:start;
  align-items:start;
  max-width:80px;
  }
`
const Grade=styled.span`
 min-width:70px;
 word-break:break-all;
 background-color:#1CA3DE;
 min-height:60px;
 border-radius:10px;
 font-size:18px;
 color:#fff;
 display:flex;
 justify-content:center;
 align-items:center;
 padding:3px;
 box-sizing:border-box;
 @media screen and (max-width:380px) {
  margin-left:0;
  margin-top:10px;
  }
`
const Span=styled.span`
 width:80px;
`
const GradeDiv=styled.div`
  display:flex;
  justify-content:space-between;
  max-width:360px;
  align-items:start;
  width:100%;
  @media screen and (max-width:600px) {
    flex-direction:column;
    padding-left:4px;
  }
  @media screen and (max-width:380px) {
  margin-left:0;
  }
`

const SubjectsWraper=styled.div`
  width:100%;
  height:25px;
  background-color:#f7f6f6;  
  border-radius:10px;
  display:flex;
  align-items:center;
  padding:30px 10px 30px 10px;
  color:#fff;
  box-sizing:border-box;
`
const Wraper=styled.div`
  max-width:1000px;
  width:100%;
  margin-left:120px;
  display:flex;
  flex-direction:column;
  align-items:end;
  justify-content:flex-end;
  @media screen and (max-width:1200px) {
    margin-left:120px;
    max-width:600px;
  }
  @media screen and (max-width:768px) {
    margin-left:0;
  }
`
const Tr=styled.tr`
   &:nth-child(odd) {
    background-color: #f2f2f2;
    border: 1px solid #fff;
  }
`
const Container=styled.div`
  display:flex;
  flex-direction:column;
  margin:0 auto;
  margin-top:17vh;
  justify-content:center;
  align-items:center;
  width: 100%;
  padding:10px;
  box-sizing:border-box;
`
const ArrowBack=styled.div`
  width:30px;
  height:30px;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:#d8d5d5;
  font-size:15px;
`
const SubjectTitle=styled.p`
  color:#262626;
  margin-left:20px;
`


interface Student{
  _id:string;
  name:string;
  privatenumber:string;
  subjects:Subject[]
}
interface Subject{
  subject:string;
  grades:Grades[];
  _id:string
}
interface Grades{
  date:string;
  grade:number;
  attendance:boolean;
}

export default function Subject() {
  const params = useParams<{ sub:string}>();
  const[id,setId]=useState<Student>({} as Student)
  const{user}=useUser()


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await userRequest.get('/student/grade');
        const filteredStudent:Student[] = response.data.filter((student:Student) => user?.privatenumber == student.privatenumber);
        const filteredid = filteredStudent.map((id) => id._id);
  
        // Check if filteredId is defined before making the second request
        if (filteredid && filteredid.length > 0) {
          const secondResponse = await userRequest.get(`/student/${filteredid[0]}/grade`);
          setId(secondResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [user?.privatenumber]); 
  

  const filteredSubject=id.subjects&&id.subjects.filter((subject)=>(subject.subject===params.sub))
  
  
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US').format(date);
  };



//shefaseba
  const totalGrade = filteredSubject
  && filteredSubject
      .map((subject) => subject.grades.map((grade) => grade.grade))
      .flat()
      .reduce((acc, current) => acc + current, 0)
  ;

const numberOfGrades = filteredSubject
  && filteredSubject
      .map((subject) => subject.grades.filter((grade)=>(grade.grade!==null)))
      .flat()
      .length
const averageGrade = numberOfGrades !== 0 ? totalGrade / numberOfGrades : 0;

const current = filteredSubject
  && filteredSubject
  .map((subject) => subject.grades.filter((grade)=>(grade.grade!==null)))
  .flat()
  .map((grade)=>(grade.grade)).join(", ")
 

//daswreba
const attend=filteredSubject&&filteredSubject.map((subject)=>(subject.grades.filter((grade)=>(grade.attendance===true)))).flat().length
const arraylength=filteredSubject&&filteredSubject.map((subject)=>(subject)).length
const filteredAttend=attend/arraylength*100

const nav=useNavigate()
const navigateBack=()=>{
  nav(-1)
}


  return (
    <Container>
      <Wraper>
      <SubjectsWraper>
        <ArrowBack onClick={navigateBack}>
          <img src={arrowBack}/>
        </ArrowBack>
        <SubjectTitle>{params.sub}</SubjectTitle>
      </SubjectsWraper>
      <TeacherWraper>
        <GradeDiv>
        <GradeTitle>
          <Span>წლიური შეფასება:</Span>
          <Grade>{averageGrade?averageGrade:''}</Grade>
          </GradeTitle>
        <GradeTitle style={{minWidth:'180px'}}>
          <Span>მიმდინარე შეფასება:</Span>
          <Grade >{current}</Grade>
          </GradeTitle>
        </GradeDiv>
        <GradeTitle>
          <Span>დასწრება:</Span>
           <Grade >{filteredAttend?filteredAttend.toFixed(2):''}%</Grade>
        </GradeTitle>
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
            {filteredSubject&&filteredSubject.map((subject)=>(subject.grades.map((grade)=>(
              <Tr>
              <Td>{formatDate(grade.date)}</Td>
              <Td>{grade.attendance?'დიახ':'არა'}</Td>
              <Td>{grade.grade}</Td>
              </Tr>
            ))))}
        </tbody>
      </Table>
      <AccordeonWraper>
      <Accordeon 
      accordstudents={id}
      subject={params.sub}
      />
      </AccordeonWraper>
    </Container>
  )
}
