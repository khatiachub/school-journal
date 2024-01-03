import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../components/UserContext'


const Links=styled(Link)`
  text-align:center;
  text-decoration:none;
  font-size:25px;
`
export default function Home() {
  const{user}=useUser()

  return (
    <div >
      <Links to={'/studentslist'}>საკლასო ოთახი</Links>
    </div>
  )
}
