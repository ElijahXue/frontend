import Header from './components/Header';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Employees from "./pages/Employees";
import Custermers from './pages/Custermers';
function App() {
  

  return (
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/employees' element = {<Employees/>}/>  
            <Route path='/customers' element = {<Custermers/>}/>
          </Routes>
        </Header>
      </BrowserRouter>
  );
}

export default App;
