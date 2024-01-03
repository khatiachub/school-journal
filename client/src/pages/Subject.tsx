import { useEffect, useState } from 'react'
import { publicRequest, userRequest } from '../components/requestmethods'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useUser } from '../components/UserContext';
import Accordeon from '../components/Accordeon';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';


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
    max-width: 600px;
    width:100%;
    background-color:#fff;
    box-shadow: #cac5c5 2px 4px 8px ;
    margin-left:100px;
    margin-top:50px;
    @media screen and (max-width:768px) {
    margin-left:0;
    max-width:600px;
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
  height:70px;
  background-color:#eee9e9;
  border-radius:10px;
  padding:20px;
  color:#fff;
  margin-top:40px;;
  display:flex;
  justify-content:space-between;
  box-sizing:border-box;
  @media screen and (max-width:600px) {
    background-color:#fff;
    height:auto;
    color:#262626;
    padding:0;
  }
`
const InputDate=styled.input`
  width:50px;
  @media screen and (max-width:600px) {
    flex-direction:column;
    width:68px;
  }
`
const GradeTitle=styled.p`
display:flex;
 @media screen and (max-width:600px) {
  margin-top:20px;
  }
`
const GradeDiv=styled.div`
  display:flex;
  justify-content:space-between;
  width:200px;
  @media screen and (max-width:600px) {
    flex-direction:column;
    width:100px;
    padding-left:4px;
  }
`
const SubjectsWraper=styled.div`
  width:100%;
  height:25px;
  background-color:#eee9e9;
  border-radius:10px;
  display:flex;
  align-items:center;
  padding:30px 10px 30px 10px;
  color:#fff;
  box-sizing:border-box;
`
const Wraper=styled.div`
  max-width:600px;
  width:100%;
  margin-left:100px;
  display:flex;
  flex-direction:column;
  align-items:end;
  justify-content:flex-end;
  @media screen and (max-width:768px) {
    margin-left:0;
    max-width:600px;
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
  margin-top:20vh;
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
  const[id,setId]=useState({})
  const[student,setStudent]=useState([])
  const{user}=useUser()

  // useEffect(()=>{
  //   async function fetchData(){
  //       try{
  //       const response=await userRequest.get('/student/grade')
  //       setStudent(response.data);
  //       } catch(error){
  //         console.error('Error fetching data:', error);
  //       };
  //     }
  //       fetchData();
  // },[])



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await userRequest.get('/student/grade');
        setStudent(response.data);
        const filteredStudent = response.data.filter((student) => user?.privatenumber == student.privatenumber);
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
  console.log(filteredSubject);
  console.log(user);
  
  
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US').format(date);
  };


  const totalGrade = filteredSubject
  ? filteredSubject
      .map((subject) => subject.grades.map((grade) => grade.grade))
      .flat()
      .filter((value) => !isNaN(value))
      .reduce((acc, current) => acc + current, 0)
  : 0;

const numberOfGrades = filteredSubject
  ? filteredSubject
      .map((subject) => subject.grades.map(() => 1))
      .flat()
      .length
  : 0;

const averageGrade = numberOfGrades !== 0 ? totalGrade / numberOfGrades : 0;

const current = filteredSubject
  ? filteredSubject
      .map((grade) =>
        grade.grades
          .map((grade2) => grade2.grade)
          .join("")
      )
      .join(", ")
  : "";

console.log(current);





  return (
    <Container>
      <Wraper>
      <SubjectsWraper>
        <ArrowBack>
          <ArrowBackIosOutlinedIcon/>
        </ArrowBack>
        <SubjectTitle>{params.sub}</SubjectTitle>
      </SubjectsWraper>
      <TeacherWraper>
        <GradeDiv>
        <GradeTitle>წლიური შეფასება: {averageGrade}
        </GradeTitle>
        <GradeTitle>მიმდინარე შეფასება:
          {current}
          </GradeTitle>
        </GradeDiv>
       <GradeDiv>
       <GradeTitle>დასწრება:</GradeTitle>
        <InputDate  type='date'/>
       </GradeDiv>
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
