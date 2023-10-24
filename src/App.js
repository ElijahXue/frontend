import Employee from "./components/Employee";
import { useState } from "react";
import './index.css';
import {v4 as uuidv4} from 'uuid';
function App() {
  const [role, setRole] = useState('dev');
  const [employees, setemployees] = useState(
    [
      {name:'Elijah', role:'Student', img:'https://yt3.googleusercontent.com/ytc/APkrFKbpSojje_-tkBQecNtFuPdSCrg3ZT0FhaYjln9k0g=s176-c-k-c0x00ffffff-no-rj'},
      {name:'Xue', role:'Student', img:'https://images.pexels.com/photos/2598024/pexels-photo-2598024.jpeg?auto=compress&cs=tinysrgb&w=800'},
      {name:'Peter', role:'Student', img:'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=800'},
      {name:'Wong', role:'Student', img:'https://www.pexels.com/photo/bald-man-with-a-serious-facial-expression-2380794/&cs=tinysrgb&w=800'},
      {name:'Qing', role:'Student', img:'https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=800'},
      {name:'Elijah', role:'Student', img:'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=800'},
  
    ]
  );
  // const showEmployees = true;

  return (
    <div >
      
      { (
        <>

          <input  type="text" 
          onChange={(a)=>{
            console.log(a.target.value);
            setRole(a.target.value);
          }}
          />
          <div className="flex flex-wrap justify-center">
           
           {employees.map((employee)=>{
            console.log(employee);
            return(
            <Employee 
              key = {uuidv4()}
              name={employee.name } 
              role = {employee.role} 
              img = {employee.img}
            />
            )
            

           })}
      
          </div>
         
        
        </>
       ) }
    </div>
  );
}

export default App;
