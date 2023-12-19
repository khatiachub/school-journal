import React from 'react'
import styled from 'styled-components'
import { days } from '../components/data'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';


const Table=styled.table`
    width:80%;
    margin:0 auto;
    margin-top:40px;
    position: relative;
`

const Th=styled.th`
  text-align: left;
  padding: 20px;
  border:none;
  color:#fff;
  background-color:#1CA3DE;
  height:40px;
`
const Td=styled.td`
    text-align: left;
    border: 1px solid #f1eeee;
    padding:20px;
    height:40px;
    color:#333333;
    `
const Tr=styled.tr`
    &:nth-child(odd) {
    background-color: #f2f2f2;
  }
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




export default function Calendar() {
  return (
    <div>
      <Table>
        <thead>
            <tr >
                <Th>დრო</Th>
                {days.map((day)=>(<Th>{day.day}</Th>))}
            </tr>
        </thead>
        <tbody>
            <Tr>
                <Td>09:00</Td>
                <Td>ქართული</Td>
                <Td>ქიმია</Td>
                <Td>ქიმია</Td>
                <Td>ბიოლოგია</Td>
                <Td>მათემატიკა</Td>
            </Tr>
            <Tr>
                <Td>10:00</Td>
                <Td>ბიოლოგია</Td>
                <Td>ბიოლოგია</Td>
                <Td>ქართული</Td>
                <Td>მათემატიკა</Td>
                <Td>რუსული</Td>
            </Tr>
            <Tr>
                <Td>11:00</Td>
                <Td>ისტორია</Td>
                <Td>ფიზიკა</Td>
                <Td>გეოგრაფია</Td>
                <Td>ფიზიკა</Td>
                <Td>ისტორია</Td>
            </Tr>
            <Tr>
                <Td>12:00</Td>
                <Td>მათემატიკა</Td>
                <Td>ინგლისური</Td>
                <Td>მათემატიკა</Td>
                <Td>ქართული</Td>
                <Td>ფიზიკა</Td>
            </Tr>
            <Tr>
                <Td>13:00</Td>
                <Td>რუსული</Td>
                <Td>გეოგრაფია</Td>
                <Td>ბიოლოგია</Td>
                <Td>ქიმია</Td>
                <Td>ინგლისური</Td>
            </Tr>
            <Tr>
                <Td>14:00</Td>
                <Td>ფიზიკა</Td>
                <Td>მათემატიკა</Td>
                <Td>ფიზიკა</Td>
                <Td>გეოგრაფია</Td>
                <Td>სპორტი</Td>
            </Tr>
        </tbody>
        <SubjectModule>
            <RemoveButton>
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
        </SubjectModule>
      </Table>
    </div>
  )
}
