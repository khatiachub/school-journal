import React from 'react'
import { subjects } from '../components/data'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';


const SubjectBox=styled.div`
   width:350px;
   height:170px;
   margin-top:30px;
   border-radius:10px;
   padding:20px;
`
const SubjectsDiv=styled.div`
  display:flex;
  justify-content:space-between;
  width:70%;
  flex-wrap:wrap;
  margin:0 auto;
  margin-top:20vh;
`
const LinkSubject=styled.div`
  text-decoration:none;
  color:#fff;
  font-size:22px;
`
const Text=styled.p`
  color:#fff;
  font-size:14px;
  width:80px;
`
const GradeWraper=styled.div`
  display:flex;
  justify-content:space-between;
  width:90%;
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
  background-color:#bbb2b2;
`
const Teacher=styled.div`
  width:90%;
  border:1px solid #fff;
  border-radius:10px;
  margin-top:15px;
  padding:15px;
`
const TeacherWraper=styled.div`
  width:100%;
  height:50px;
  background-color:#e0dada;
  border-radius:10px;
  margin-top:40px;
  padding:20px;
  color:#fff;
`
export default function Subjects() {
  
  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return (
    <SubjectsDiv>
      <TeacherWraper>დამრიგებელი:</TeacherWraper>
      {subjects.map((subject,i)=>(
        <SubjectBox key={i} style={{backgroundColor:getRandomColor()}}>
          <SubjectWrap>
            <LinkSubject >{subject.subject}</LinkSubject>
            <Link to={`/subjects/${subject.subject}`}>
            <Arrow >
            <ArrowForwardIosOutlinedIcon/>
            </Arrow>
            </Link>
          </SubjectWrap>
            <Teacher>
            <Text>მასწავლებელი:</Text>
            </Teacher>
            <GradeWraper>
            <Text>მიმდინარე სემესტრის შეფასება:</Text>
            <Text>დასწრება:</Text>
            <Text>წლიური შეფასება:</Text>
            </GradeWraper>
        </SubjectBox>
      ))}
    </SubjectsDiv>
  )
}
