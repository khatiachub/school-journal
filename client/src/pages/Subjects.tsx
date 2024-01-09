import { useEffect, useState } from 'react'
import { subjects } from '../components/data'
import { Link} from 'react-router-dom'
import styled from 'styled-components'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useUser } from '../components/UserContext';
import { userRequest } from '../components/requestmethods';


const SubjectBox=styled(Link)`
   max-width:350px;
   width:100%;
   height:160px;
   margin-top:30px;
   border-radius:10px;
   padding:30px 20px 30px 20px;
   margin-left:10px;
   text-decoration:none;
   @media screen and (max-width:400px) {
    max-width:270px;
    height:auto;
   }
   &:nth-child(1){
    background-color:#3190C5;
   }
   &:nth-child(2){
    background-color:#60B7DE;
   }
   &:nth-child(3){
    background-color:#87CEEB;
   }&:nth-child(4){
    background-color:#B0E1F9;
   }&:nth-child(5){
    background-color:#5CD1FA;
   }&:nth-child(6){
    background-color:#01BFFF;
   }&:nth-child(7){
    background-color:#697FBD;
   }
   &:nth-child(8){
    background-color:#0160C9;
   }

   @media screen and (max-width:1400px) {
    margin-left:0px;
  }
  @media screen and (max-width:1318px) {
    width:400px;
  }
  @media screen and (max-width:960px) {
    max-width:550px;
    width:100%;
  }
`
const SubjectsDiv=styled.div`
  display:flex;
  justify-content:space-between;
  width:90.8%;
  flex-wrap:wrap;
  box-sizing:border-box;
  margin-top:13vh;
  @media screen and (max-width:1200px) {
    width:85%;
  }
  @media screen and (max-width:960px) {
    width:100%;
    justify-content:center;
    padding:10px;
  }
`
const ContentDiv=styled.div`
  width:137px;
  height:100vh;
  @media screen and (max-width:768px) {
    display:none;
  }
`
const Container=styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  padding-right:14px;
  box-sizing:border-box;
  @media screen and (min-width:1600px) {
    padding-right:31px;
  }
  @media screen and (max-width:1200px) {
    padding-right:20px;
  }
  @media screen and (max-width:1065px) {
    padding-right:15px;
  }
  @media screen and (max-width:960px) {
    padding-right:0px;
  }
`
const LinkSubject=styled.div`
  text-decoration:none;
  color:#fff;
  font-size:22px;
`
const Text=styled.div`
  color:#fff;
  font-size:14px;
  display:flex;
  align-items:end;
  justify-content:center;
  height:auto;
`
const Span=styled.span`
  margin-left:5px;
  @media screen and (max-width:400px) {
    max-width:80px;
    width:100%;
  }
`
const GradeWraper=styled.div`
  display:flex;
  justify-content:space-between;
  width:99%;
  margin-top:20px;
`
const SubjectWrap=styled.div`
  display:flex;
  justify-content:space-between;
`
const Arrow=styled.div`
  width:30px;
  height:30px;
  border-radius:5px;
  display:flex;
  justify-content:center;
  align-items:center;
  color:#fff;
  padding:5px;
  background-color:#e9e6e6;
`
const Teacher=styled.div`
  width:96%;
  border:1px solid #fff;
  border-radius:10px;
  margin-top:15px;
  padding:15px 5px 15px 5px;
  display:flex;
  flex-direction:column;
  justify-content:start;
  align-items:start;
`
interface Students{
  name:string;
  privatenumber:number|undefined;
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

export default function Subjects() {
  const[id,setId]=useState([])
  const{user}=useUser()
  
  useEffect(()=>{
    async function fetchData(){
        try{
        const response=await userRequest.get('/student/grade')
        setId(response.data);  
                  
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
  },[])
  
    const filteredId=id.filter((id:Students)=>(id.privatenumber==user?.privatenumber))
    const filtered=filteredId&&filteredId.map((subject:Students)=>(subject.subjects)).flat()

  return (
    <Container >
      <ContentDiv></ContentDiv>
    <SubjectsDiv>
{subjects.map((subject, i) => {
  const filteredSubject = filtered && filtered.filter((subj:Subjects) => subj.subject === subject.subject);
  //jamuri qula
  const totalGrade =
    filteredSubject &&
    filteredSubject
      .map((subj:Subjects) => subj.grades.map((grade) => grade.grade))
      .flat()
      .reduce((acc:number, current:number) => acc + current, 0);
//qulebis raodenoba
  const numberOfGrades =
    filteredSubject &&
    filteredSubject
      .map((subj:Subjects) => subj.grades.filter((grade) => grade.grade !== null))
      .flat()
      .length;

  const averageGrade = numberOfGrades !== 0 ? totalGrade / numberOfGrades : 0;
//mindinare qula
  const current =
    filteredSubject &&
    filteredSubject
      .map((subj:Subjects) => subj.grades.filter((grade) => grade.grade !== null))
      .flat()
      .map((grade:Grades) => grade.grade)
      .join(", ");

  // Daswreba
  const attend =
    filteredSubject &&
    filteredSubject.map((subj:Subjects) => subj.grades.filter((grade) => grade.attendance === true)).flat().length;

  const arraylength = filteredSubject && filteredSubject.map((subj:Subjects) => subj).length;

  const filteredAttend = (attend / arraylength) * 100;

  return (
    <SubjectBox key={i} to={`/subjects/${subject.subject}`}>
    <SubjectWrap>
      <LinkSubject>{subject.subject}</LinkSubject>
        <Arrow>
          <ArrowForwardIosOutlinedIcon />
        </Arrow>
    </SubjectWrap>
    <Teacher>
      <Text >
        <Span>მიმდინარე სემესტრის შეფასება:</Span>
        <Span style={{wordBreak:'break-all'}}>{current}</Span>
      </Text>
      <GradeWraper>
      <Text>
       <Span> დასწრება:</Span>
       <Span> {filteredAttend?filteredAttend.toFixed(2):''}%</Span>
      </Text>
      <Text>
        <Span>წლიური შეფასება:</Span>
        <Span>{averageGrade?averageGrade:''}</Span>
      </Text>
      </GradeWraper>
    </Teacher>
  </SubjectBox>
  );
})}
    </SubjectsDiv>
    </Container>
  )
}
