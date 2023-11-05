import { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import { baseURL } from "../shared";
import AddCustomer from "../components/AddCustomer";
export default function Customers() {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    console.log('fetching..')
    fetch(baseURL + "api/customers/")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      })
  }, []);
  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    console.log(name);
    const url = baseURL + 'api/customers';
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
        throw new Error('Something Went wrong');
      }
      return response.json();
    }
    ).then((data)=>{

    }).catch((e)=>{
      console.log(e);
    });

  }
  return (
    <>
      <h1> Hello there </h1>
      <ul>
        {customers ? (
          customers.map((customer) => {
            return (
              <li key={customer.id}>
                <Link to={"/customers/" + customer.id}>
                  {customer.name}
                </Link>
              </li>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </ul>

      <AddCustomer newCustomer={newCustomer} />

    </>
  );
}
