import Employee from "../components/Employee";
import { useState } from "react";
import '../index.css';
import EditEmployee from "../components/EditEmployee";
import Header from "../components/Header";
function Employees() {

  const [employees, setemployees] = useState(
    [
      {name:'Elijah', id : 1 ,role:'Student', img:'https://yt3.googleusercontent.com/ytc/APkrFKbpSojje_-tkBQecNtFuPdSCrg3ZT0FhaYjln9k0g=s176-c-k-c0x00ffffff-no-rj'},
      {name:'Xue', id : 2 ,role:'Student2', img:'https://images.pexels.com/photos/2598024/pexels-photo-2598024.jpeg?auto=compress&cs=tinysrgb&w=800'},
      {name:'Peter', id : 3 ,role:'Student3', img:'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=800'},
      {name:'Wong', id : 4 ,role:'Student4', img:'https://www.pexels.com/photo/bald-man-with-a-serious-facial-expression-2380794/&cs=tinysrgb&w=800'},
      {name:'Qing', id : 5 ,role:'Student5', img:'https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=800'},
      {name:'Elijah', id : 6 ,role:'Student6', img:'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=800'},
  
    ]
  );
  function updateEmployee(id,newName, newRole){
    console.log('update employee inside app.js');
  }
  // const showEmployees = true;

  return (
    <div  >
     
      
      { (
        <>

          <div className="flex flex-wrap justify-center ">
           
           {employees.map((employee)=>{
            // console.log(employee);
            const editEmployee = (
              <EditEmployee id = {employee.id} 
              name = {employee.name} 
              role = {employee.role} 
              updateEmployee = {updateEmployee} />
            )
            return(
            <Employee 
              key = {employee.id } 
              name={employee.name }  
              role = {employee.role} 
              img = {employee.img}
              editEmployee  = {editEmployee}
            />
            )
            

           })}
      
          </div>
         
        
        </>
       ) }
    </div>
  );
}

export default Employees;