import Employee from "../components/Employee";
import { useState } from "react";
import '../index.css';
import EditEmployee from "../components/EditEmployee";
import Header from "../components/Header";
function Custermers() {

 
  function updateEmployee(id,newName, newRole){
    console.log('update employee inside app.js');
  }
  // const showEmployees = true;

  return (
    <div className="App bg-gray-300 min-h-screen" >
     
      
    <p> Hello this is the second page </p>
     
  
    </div>
  );
}

export default Custermers;
