import { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useParams } from 'react-router-dom'
import { userRequest } from './requestmethods';
import { useUser } from './UserContext';
import trash from '../images/trash (1).svg'
import editIcon from '../images/edit.svg'


const LinkStudent=styled(Link)`
    color:#1CA3DE;
    font-family: 'Cormorant Garamond', serif;
    font-family: 'Raleway', sans-serif;
    text-align:start;
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
  @media screen and (max-width:900px) {
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
    @media screen and (max-width:900px) {
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
   right:5px;
   width:60px;
   height:30px;
   top:25px;
   border:none;
   font-size:14px;
`
const GradeDeleteIcon=styled.div`
    color:#1CA3DE;
    text-align:center;
    position:absolute;
    left:50%;
    transform:translateX(-50%);
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

interface State{
  grade:number|null;
  subject:string;
  attendance:boolean|string;
  date:string
}

interface Props {
  students:Student[]|any;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  subject: string;
  setState: React.Dispatch<React.SetStateAction<State>>;
  state:State;
  editGrade:(id:string)=>void;
}
export default function Table (props:Props|any){
    const loc=useLocation()
    const deleteStudent=(id:string)=>{
      async function fetchData(){
        try{
        await userRequest.delete(`/student/${id}`)
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
        const students = props.students.filter((item:Student) => item._id !== id);
        props.setStudents(students)
    }
    const[name,setName]=useState({name:''})
    const[edit,setEdit]=useState(false)
    const[id,setId]=useState('')

    const handleChange=(e:React.ChangeEvent)=>{
      const target = e.target as HTMLInputElement;
      const value=target.value
      setName({name:value})
      props.setState({...props.state,[target.name]:value})
    }
    const editName=(id:string)=>{
      if(name.name===''){
        return
      }
      async function fetchData(){
        try{
        await userRequest.put(`/student/${id}/grade`,name)
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
    const deleteGrade=(subjectId:string)=>{
      async function fetchData(){
        try{
        const response=await userRequest.delete(`/student/${params.id}/grade/${subjectId}`)
        console.log(response.data);
        window.location.reload()
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
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
    
    const{user}=useUser()
  return (
       <TableBox>
      <thead>
        <Tr >
            {loc.pathname==='/'&&user?.status==='მასწავლებელი'?
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
           {loc.pathname==='/'&&user?.status==='მასწავლებელი'?
           <>
           {props.students&&props.students.map((student:Student)=>(
           <Td style={{borderRight:'none'}}  key={student._id}>{student.privatenumber}</Td>
           ))        
           }  
                     
           </>
           :<>
           {/* tarigiiiiiiiiiiiii */}
           {filteredSubject&&filteredSubject.map((subject:Subject)=>(
            subject.grades.map((date)=>(
            // <Td key={date._id}>{formatDate(date?.date)}</Td>
            <Td key={subject._id}>
              <div style={{display:'flex', alignItems:'baseline',justifyContent:'space-between'}}>
           </div>
            { formatDate(date?.date)}
          </Td>
            ))
           ))}
           </>
           }
           </Tdborder >

           {/* saerto cxrili editiiiiiiiiiiiiii */}
           {loc.pathname==='/'&&user?.status==='მასწავლებელი'?
           <Tdborder>
           {props.students&&props.students.map((student:Student)=>(
            
           <Td  key={student._id}>
                {edit&&student._id===id?
                 <div style={{display:'flex', alignItems:'center'}}>
                  <LinkStudent key={student.privatenumber} to={''} className='list'><Input  placeholder='change name' onChange={(e)=>handleChange(e)} name='name' /></LinkStudent>
                  <Button onClick={()=>editName(student._id)}>Change</Button>
                 </div>
                  :
                  <LinkStudent key={student.privatenumber} to={`/student/${student._id}`} className='list'>{student.name}</LinkStudent>
                }
            </Td>
            
            ))}
            </Tdborder>:''}
            {loc.pathname==='/'&&user?.status==='მასწავლებელი'?props.students&&props.students.map((student:Student)=>(
            <>
            <Td   key={student._id}>
                <DeleteIcon  onClick={()=>deleteStudent(student._id)}>
                <img src={trash}/>
                 </DeleteIcon>
                <EditIcon  onClick={()=>handleEdit(student._id)}>
                <img src={editIcon}/>
                </EditIcon>
            </Td>
            </>
            )):''}


           {/* <saganiiiiiiiiiiiiii */}
          <Tdborder >
          {filteredSubject&&filteredSubject.map((subject:Subject)=>(
            <Td key={subject._id}>
                   <div style={{display:'flex', alignItems:'baseline',justifyContent:'space-between'}}>
                </div>
                 {subject.subject}
            </Td>                  
            ))}

          </Tdborder>
            <Tdborder>
               {/* daswrebaaaaaaaaaaaaaaa */}
             {filteredSubject&&filteredSubject.map((subject:Subject)=>(
                 subject.grades.map((grade)=>(
                 <Td key={subject._id}>
                   <div style={{display:'flex', alignItems:'baseline',justifyContent:'space-between'}}>
                </div>
                  {grade.attendance?'კი':'არა'}
               </Td>
                 ))
              ))}
            </Tdborder>
           
            {/* qulebiiiiiiiiiii */}
           <Tdborder >
           {filteredSubject&&filteredSubject.map((subject:Subject)=>(
                subject.grades.map((grade)=>(
                <Td key={subject._id}>
                  {edit&&subject._id===id?
                    <div style={{display:'flex', alignItems:'baseline',justifyContent:'space-between'}}>
                  <div  className='list'><Input  placeholder='შეცვალე ქულა' onChange={(e)=>handleChange(e)} name='grade' /></div>
                  <Button onClick={()=>props.editGrade(subject._id)}>Change</Button>
                 </div>
                  :grade.grade}
                </Td>
                ))
            ))
           }
            </Tdborder>
            <Tdborder >
           {filteredSubject&&filteredSubject.map((subject:Subject)=>(
              <Td   key={subject._id}>
              <GradeDeleteIcon   onClick={()=>deleteGrade(subject._id)}>
               {/* <DeleteOutlineOutlinedIcon/> */}
               </GradeDeleteIcon>
              </Td>
            ))
           }
            </Tdborder>
        </tr>
      </tbody>
    </TableBox>
  )
}