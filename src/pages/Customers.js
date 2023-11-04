import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../shared";
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
    </>
  );
}
