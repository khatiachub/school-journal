import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Links=styled(Link)`
  text-align:center;
  text-decoration:none;
  font-size:25px;
`
export default function Home() {
  return (
    <div >
      <Links to={'/studentslist'}>საკლასო ოთახი</Links>
    </div>
  )
}
