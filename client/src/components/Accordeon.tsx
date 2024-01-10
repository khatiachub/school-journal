import  { useState } from 'react'
import styled from 'styled-components'
import {  useLocation } from 'react-router-dom'
import arrowdown from '../images/chevron-down.svg'
import arrowup from '../images/chevron-up (1).svg'
import trash from '../images/trash (1).svg'
import editIcon from '../images/edit.svg'


const Accordbox=styled.div`
  max-width:600px;
  width:100%;
  height:40px;
  background-color:#faf6f6;
  position: relative;
  margin-top:20px;
  padding:10px 0px 20px 0px;
  transition:0.5s;
  border-radius:10px;
  box-shadow: #cac5c5 2px 4px 8px ;
  color:#262626;

`
const Arrowdown=styled.div`
 position:absolute;
 right:15px;
 top:20px;
`
const Arrowup=styled.div`
    position:absolute;
    right:15px;
    top:20px;
`
const Gradediv=styled.div`
    margin-top:20px;
`
const Text=styled.p`
   margin-left:10px;
`
const EditIcon=styled.div`
  color:#1CA3DE;
  cursor: pointer;
 
`
const DeleteIcon=styled.div`
  color:#1CA3DE;
  cursor: pointer;
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
interface State {
  [key: string]: boolean;
}
interface AccordeonProps {
  accordstudents:Student|any; 
  subject: string|undefined;
}


const Accordeon:React.FC<AccordeonProps> =(props)=> {

    const filteredSubject=props.accordstudents.subjects&&props.accordstudents.subjects.filter((subject:Subject)=>(subject.subject===props.subject))
    const formatDate = (dateString:string) => {
      if(dateString){
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US').format(date);    
      }else{
        return
      }
    }; 
    const[state,setState]=useState<State>({})
    const handleClick=(Id:string)=>{
        setState({...state,[Id]:!state[Id]})
    }
    const loc=useLocation()

  return (
    <div>
         {filteredSubject&&filteredSubject.map((subject:Subject)=>(
            subject.grades.map((date)=>(
                <Accordbox style={{height:`${state[date._id]?'170px':'40px'}`}} key={date._id} >
                  <Text style={{fontWeight:'bold'}}>გაკვეთილი</Text>
                  <Text style={{marginTop:10}}>{formatDate(date.date)}</Text>
                  {state[date._id]?
                  <>
                  <Gradediv>
                  <div style={{display:'flex',justifyContent:'space-between',paddingRight:20}}>
                        <Text>საგანი:</Text>
                        <Text>{subject.subject}</Text>
                    </div>
                    {loc.pathname==='/studentroom'?
                    <div style={{display:'flex',justifyContent:'space-between',paddingRight:20,marginTop:20}}>
                        <div style={{display:'flex',alignItems:'baseline'}}>
                            <Text>შეფასება:</Text>
                            <Text>{date.grade}</Text>
                        </div>
                       <div style={{display:'flex',width:55,justifyContent:'space-between'}}>
                          <DeleteIcon>
                             <img src={trash}/>
                          </DeleteIcon>
                          <EditIcon>
                            <img src={editIcon}/>
                          </EditIcon>
                       </div>
                    </div>:
                    <div style={{display:'flex',justifyContent:'space-between',paddingRight:20,marginTop:20}}>
                        <Text>შეფასება:</Text>
                        <Text>{date.grade}</Text>
                   </div>
                    }
                    {loc.pathname==='/studentroom'?
                    <div style={{display:'flex',justifyContent:'space-between',paddingRight:20,marginTop:20}}>
                        <div style={{display:'flex',alignItems:'baseline'}}>
                            <Text>დასწრება:</Text>
                            <Text>{date.attendance?'კი':'არა'}</Text>
                        </div>
                        <div style={{display:'flex',width:55,justifyContent:'space-between'}}>
                          <DeleteIcon>
                          <img src={trash}/>
                          </DeleteIcon>
                          <EditIcon>
                          <img src={editIcon}/>
                          </EditIcon>
                       </div>
                   </div>:
                   <div style={{display:'flex',justifyContent:'space-between',paddingRight:20,marginTop:20}}>
                       <Text>დასწრება:</Text>
                       <Text>{date.attendance?'კი':'არა'}</Text>
                  </div>}
                  </Gradediv>
                  <Arrowdown onClick={()=>handleClick(date._id)}>
                  <img src={arrowdown}/>
                 </Arrowdown>
                  </>
                :
                <Arrowup  onClick={()=>handleClick(date._id)}>
                <img src={arrowup}/>
                </Arrowup>
                }
                </Accordbox>            
                ))
            ))}
      </div>
  )
}
export default Accordeon
