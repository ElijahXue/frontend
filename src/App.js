import Employee from "./components/Employee";
import { useState } from "react";
import './index.css';
function App() {
  const [role, setRole] = useState('dev');

  const showEmployees = true;

  return (
    <div className="App bg-red-300 text-3xl font-bold">
      
      {showEmployees ? (
        <>

          <input className="bg-orange-400" type="text" 
          onChange={(a)=>{
            console.log(a.target.value);
            setRole(a.target.value);
          }}
          />;
          <Employee  name="caleb" role="intern"/>
          <Employee role = {role}/>
          <Employee/>
          <Employee/>
          <p className="bg-orange-200">You can not see the employees</p>
        </>
       ) : ( <p className="bg-orange-400">You can not see the employees</p>
       )}
    </div>
  );
}

export default App;
