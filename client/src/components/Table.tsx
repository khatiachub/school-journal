import { useState } from 'react'
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
    &:nth-child(even) {
    background-color: #f2f2f2;
    border: 1px solid #fff;
  }
`
const DeleteIcon=styled.div`
  /* position:absolute;
  right:55px; */
  color:#1CA3DE;
  cursor: pointer;
  margin-right:60px;
  @media screen and (max-width:600px) {
    font-size:13px;
    /* right:40px; */
  }
  @media screen and (max-width:485px) {
    font-size:10px;
    box-sizing:border-box;
    /* right:45px; */
  }
  @media screen and (max-width:400px) {
    /* margin-right:0; */
  }
`
const EditIcon=styled.div`
  position:absolute;
  right:20px;
  color:#1CA3DE;
  cursor: pointer;
  /* margin-right:25px; */
  @media screen and (max-width:600px) {
    font-size:10px;
    /* margin-right:10px; */
  }
  @media screen and (max-width:485px) {
    padding: 5px;
    font-size:10px;
    box-sizing:border-box;
    right:12px;
    /* margin-right:0px; */
  }
`
const Tdborder=styled.td`
  border:none;
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

interface Grade {
  date: string;
  attendance: boolean;
  grade: number;
  _id:string;
}
interface Subject {
  _id: string;
  subject: string;
  grades: Grade[];
}

interface Student {
  _id: string;
  privatenumber: string;
  name: string;
  subjects:Subject[];
}

interface Props {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  subject: string;
}






export default function Table (props:Props){
    const loc=useLocation()
    const deleteStudent=(id:string)=>{
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

    const handleChange=(e:React.ChangeEvent)=>{
      const target = e.target as HTMLInputElement;
      const value=target.value
      setName({name:value})
    }
    const editName=(id:string)=>{
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
    const handleEdit=(id:string)=>{
      setId(id)
      setEdit(!edit)
    }
    const params=useParams()
    const deleteGrade=(weekId:string)=>{
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
    const handleEditGrade=(id:string)=>{

    }
    
    
    
    const filteredSubject=props.students.subjects&&props.students.subjects.filter((subject:Subject)=>(subject.subject===props.subject))
    const formatDate = (dateString:string) => {
      if(dateString){
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US').format(date);    
      }else{
        return
      }
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
            <Th >რედაქტირება</Th>
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
           {filteredSubject&&filteredSubject.map((subject:Subject)=>(
            subject.grades.map((date)=>(<Td key={date._id}>{formatDate(date?.date)}</Td>))
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
                  <LinkStudent key={student.privatenumber} to={''} className='list'><Input placeholder='change name' onChange={(e)=>handleChange(e)} name='name' /></LinkStudent>
                  <Button onClick={()=>editName(student._id)}>Change</Button>
                 </div>
                  :
                  <LinkStudent key={student.privatenumber} to={`/student/${student._id}`} className='list'>{student.name}</LinkStudent>
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
          {filteredSubject&&filteredSubject.map((subject:Subject)=>(
            <Td>{subject.subject}</Td>
            ))}

          </Tdborder>
            <Tdborder>
               {/* daswrebaaaaaaaaaaaaaaa */}
             {filteredSubject&&filteredSubject.map((subject:Subject)=>(
                 subject.grades.map((grade)=>(<Td>{grade.attendance?'კი':'არა'}</Td>))
              ))}
            </Tdborder>
           
            {/* qulebiiiiiiiiiii */}
           <Tdborder >
           {filteredSubject&&filteredSubject.map((subject:Subject)=>(
                subject.grades.map((grade)=>(<Td key={subject._id}>{grade.grade}</Td>))
            ))
           }
            </Tdborder>
            <Tdborder >
           {filteredSubject&&filteredSubject.map((subject:Subject)=>(
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