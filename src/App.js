import Employee from "./components/Employee";
import { useState } from "react";
function App() {
  const [role, setRole] = useState('dev');

  const showEmployees = true;

  return (
    <div className="App">
      
      {showEmployees ? (
        <>

          <input type="text" 
          onChange={(a)=>{
            console.log(a.target.value);
            setRole(a.target.value);
          }}
          />;
          <Employee name="caleb" role="intern"/>
          <Employee role = {role}/>
          <Employee/>
          <Employee/>
        </>
       ) : ( <p>You can not see the employees</p>
       )}
    </div>
  );
}

export default App;
