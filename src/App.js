import Employee from "./components/Employee";

function App() {
 
  const showEmployees = false;

  return (
    <div className="App">
      {showEmployees ? (
        <>
        <Employee/>
        <Employee/>
        <Employee/>
        <Employee/>
        </>
       ) : ( <p>You can not see the employees</p>
       )}
    </div>
  );
}

export default App;
