import Header from './components/Header';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Employees from "./pages/Employees";
import NotFound from './components/NotFound';
import Custermers from './pages/Custermers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/definition';
function App() {
  

  return (
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/employees' element = {<Employees/>}/>  
            <Route path='/customers' element = {<Custermers/>}/>
            <Route path='/dictionary' element = {<Dictionary/>}/>
            {/* <Route path='/definition' element = {<Definition/>}/> */}
            <Route path='/dictionary/:search' element = {<Definition/>}/>
            <Route path='/404' element = {<NotFound/>}/>
            <Route path='*' element = {<NotFound/>}/>
          </Routes>
        </Header>
      </BrowserRouter>
  )
}

export default App;
