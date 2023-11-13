import Header from './components/Header';
import './index.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Employees from "./pages/Employees";
import NotFound from './components/NotFound';
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Customer from './pages/Customer';
import Definition from './pages/definition';
import { createContext, useState, useEffect } from 'react';
import Login from './pages/Login';
import { baseURL } from './shared';
import Register from './pages/Register';


export const LoginContext = createContext();

function App() {

  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseURL + 'api/token/refresh/';
        fetch(url, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refresh: localStorage.refresh
          })
        }
        ).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data)
          localStorage.refresh = data.refresh;
          localStorage.access = data.access;
          setloggedIn(true);
        })
      }
    }
    const minute = 1000 * 60;
    refreshTokens()
    setInterval(refreshTokens, minute * 3)

  }, [])




  const [loggedIn, setloggedIn] = useState(localStorage.access ? true : false);
  function changeLoggedIn(value) {
    setloggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }



  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/employees' element={<Employees />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/:id' element={<Customer />} />
            {/* <Route path='/customers/:*' element = {<NotFound/>}/> */}
            <Route path='/dictionary' element={<Dictionary />} />
            {/* <Route path='/definition' element = {<Definition/>}/> */}
            <Route path='/dictionary/:search' element={<Definition />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App;
