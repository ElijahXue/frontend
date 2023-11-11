import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../shared";
import AddCustomer from "../components/AddCustomer";
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from "../App";
export default function Customers() {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  const [loggedIn,setloggedIn] = useContext(LoginContext);

  const navigate = useNavigate();
  const location = useLocation();
  function toggleShow() {
    setShow(!show)
  }
  useEffect(() => {
    // const [loggedIn,setloggedIn] = useContext(LoginContext)
    // console.log('fetching..')

    const url = baseURL + "api/customers/";
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access')
      }
    })
      .then((response) => {
        if (response.status === 401) {
          setloggedIn(false);
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            }
          })
          // console.log("customers" , location.pathname);
        }
        if (!response.ok) {
          // throw new Error('Something went wrong');
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        // console.log(data);
        setCustomers(data.customers);
      })
  }, []);

  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    console.log(name);
    const url = baseURL + 'api/customers/';
    fetch(
      url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    ).then((response) => {
      if (!response.ok) {
        // throw new Error('Something Went wrong');
      }
      return response.json();
    }
    ).then((data) => {
      // hide the modal? 
      setCustomers([...customers, data.customer]);

      toggleShow();
    }).catch((e) => {
      console.log(e);
    });

  }
  return (
    <>
      <h1> Hello there </h1>

      {customers ? (
        customers.map((customer) => {
          return (
            <div className="my-1" key={customer.id}>
              <Link to={"/customers/" + customer.id}>
                <button className="no-underline bg-purple-600 text-white font-bold py-2 px-4 rounded">
                  {customer.name}
                </button>
              </Link>
            </div>
          )
        })
      ) : (
        <p>Loading...</p>
      )}


      <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />

    </>
  );
}
