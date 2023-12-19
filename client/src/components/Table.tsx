import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useParams } from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { publicRequest } from './requestmethods';


const LinkStudent=styled(Link)`
    color:#1CA3DE;
    font-family: 'Cormorant Garamond', serif;
    font-family: 'Raleway', sans-serif;
    `


const TableBox=styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    background-color:#fff;
    box-shadow: #cac5c5 2px 4px 8px ;
    height:auto;

`
const Tr=styled.tr`
  
`
const Th=styled.th`
  text-align: left;
  padding: 20px;
  border-left:1px solid #fff;
  color:#fff;
  background-color:#1CA3DE;
  height:40px;
  @media screen and (max-width:600px) {
    padding: 10px;
    font-size:13px;
  }
  @media screen and (max-width:485px) {
    padding-left: 3px;
    font-size:10px;
    /* box-sizing:border-box; */
  }
  
`
const Td=styled.td`
    text-align: center;
    border: 1px solid #f1eeee;
    display:flex;
    justify-content:center;
    align-items:baseline;
    border-top:none;
    padding:20px;
    flex-direction:column;
    position: relative;
    height:40px;
    color:#333333;
    @media screen and (max-width:600px) {
    padding: 10px;
    font-size:13px;
  }
  @media screen and (max-width:485px) {
    padding-left: 3px;
    font-size:10px;
    height:50px;
    /* box-sizing:border-box; */
  }
    &:nth-child(even) {
    background-color: #f2f2f2;
    border: 1px solid #fff;
  }
`
const DeleteIcon=styled.div`
  position:absolute;
  right:55px;
  color:#1CA3DE;
  cursor: pointer;
  margin-right:30px;
  @media screen and (max-width:600px) {
    font-size:13px;
    margin-right:0px;
  }
  @media screen and (max-width:485px) {
    font-size:10px;
    box-sizing:border-box;
    margin-right:0px;
    right:45px;
  }
`
const EditIcon=styled.div`
  position:absolute;
  right:20px;
  color:#1CA3DE;
  cursor: pointer;
  margin-right:25px;
  @media screen and (max-width:600px) {
    font-size:10px;
    margin-right:0px;
  }
  @media screen and (max-width:485px) {
    padding: 5px;
    font-size:10px;
    box-sizing:border-box;
    right:12px;
  }
`
const Tdborder=styled.td`
  border:none;
`

const EditBox=styled.div`
  position:absolute;
  left:50%;
`
const Input=styled.input`
  max-width:300px;
  width:100%;
  height:50px;
  border:none;
  outline:none;
`
const Button=styled.button`
   position:absolute;
   right:90px;
   width:80px;
   height:30px;
   top:25px;
   border:none;
`

export default function Table(props) {
    const loc=useLocation()
    const deleteStudent=(id)=>{
      async function fetchData(){
        try{
        const response=await publicRequest.delete(`/student/${id}/grade`)
        console.log(response.data);
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
        const students = props.students.filter((item) => item._id !== id);
        props.setStudents(students)
    }
    const[name,setName]=useState({name:''})
    const[edit,setEdit]=useState(false)
    const[id,setId]=useState('')

    const handleChange=(e)=>{
      const value=e.target.value
      setName({name:value})
    }
    const editName=(id)=>{
      if(name.name===''){
        return
      }
      async function fetchData(){
        try{
        const response=await publicRequest.put(`/student/${id}/grade`,name)
        console.log(response.data);
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
        window.location.reload()
    }
    const handleEdit=(id)=>{
      setId(id)
      setEdit(!edit)
    }
    const params=useParams()
    const deleteGrade=(weekId)=>{
      async function fetchData(){
        try{
        const response=await publicRequest.delete(`/student/${params.id}/grade/${weekId}`)
        console.log(response.data);
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
        // window.location.reload()
        // const students = props.filteredweek.filter((item) => item._id !== weekId);
        // props.setStudents(students)
    }
    const handleEditGrade=()=>{

    }
    
    
    
    const filteredSubject=props.students.subjects&&props.students.subjects.filter((subject)=>(subject.subject===props.subject))
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US').format(date);
    };    
    
  return (
       <TableBox>
      <thead>
        <Tr >
            {loc.pathname==='/studentslist'?
            <>
            <Th>პირადი ნომერი</Th>
            <Th>სახელი</Th>
            <Th>რედაქტირება</Th>
            </>
            :
            <>
            <Th>გაკვეთილი</Th> 
            <Th>საგანი</Th>
            <Th>დასწრება</Th>
            <Th>შეფასება</Th>
            <Th>რედაქტირება</Th>
            </>
            }
        </Tr>
      </thead>
      <tbody>
        <tr>
          {/* //saerto cxrili id */}
          <Tdborder >
           {loc.pathname==='/studentslist'?
           <>
           {props.students&&props.students.map((student)=>(
           <Td style={{borderRight:'none'}}  key={student._id}>{student.privatenumber}</Td>
           ))        
           }  
                     
           </>
           :<>
           {/* tarigiiiiiiiiiiiii */}
           {filteredSubject&&filteredSubject.map((subject)=>(
            subject.grades.map((date)=>(<Td>{formatDate(date.date)}</Td>))
           ))}
           </>
           }
           </Tdborder >

           {/* saerto cxrili editiiiiiiiiiiiiii */}
           {loc.pathname==='/studentslist'?
           <Tdborder>
           {props.students&&props.students.map((student)=>(
            
           <Td  key={student._id}>
                {edit&&student._id===id?
                 <div style={{display:'flex', alignItems:'center'}}>
                  <LinkStudent key={student.studentId} to={''} className='list'><Input placeholder='change name' onChange={(e)=>handleChange(e)} name='name' /></LinkStudent>
                  <Button onClick={()=>editName(student._id)}>Change</Button>
                 </div>
                  :
                  <LinkStudent key={student.studentId} to={`/student/${student._id}`} className='list'>{student.name}</LinkStudent>
                }
            </Td>
            
            ))}
            </Tdborder>:''}
            {loc.pathname==='/studentslist'?props.students&&props.students.map((student)=>(
            <>
            <Td   key={student._id}>
                <DeleteIcon  onClick={()=>deleteStudent(student._id)}>
                <DeleteOutlineOutlinedIcon/>
                </DeleteIcon>
                <EditIcon  onClick={()=>handleEdit(student._id)}>
                <ModeEditOutlineOutlinedIcon/>
                </EditIcon>
            </Td>
            </>
            )):''}







           {/* <saganiiiiiiiiiiiiii */}
          <Tdborder >
          {filteredSubject&&filteredSubject.map((subject)=>(
            <Td>{subject.subject}</Td>
            ))}

          </Tdborder>
            <Tdborder>
               {/* daswrebaaaaaaaaaaaaaaa */}
             {filteredSubject&&filteredSubject.map((subject)=>(
                 subject.grades.map((grade)=>(<Td>{grade.attendance?'კი':'არა'}</Td>))
              ))}
            </Tdborder>
           
            {/* qulebiiiiiiiiiii */}
           <Tdborder >
           {filteredSubject&&filteredSubject.map((subject)=>(
                subject.grades.map((grade)=>(<Td key={subject._id}>{grade.grade}</Td>))
            ))
           }
            </Tdborder>
            <Tdborder >
           {filteredSubject&&filteredSubject.map((subject)=>(
              <Td   key={subject._id}>
              <DeleteIcon   onClick={()=>deleteGrade(subject._id)}>
               <DeleteOutlineOutlinedIcon/>
               </DeleteIcon>
               <EditIcon   onClick={()=>handleEditGrade(subject._id)}>
               <ModeEditOutlineOutlinedIcon/>
               </EditIcon>
              </Td>
            ))
           }
            </Tdborder>
        </tr>
      </tbody>
    </TableBox>
  )
}