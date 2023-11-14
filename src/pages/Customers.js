import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../shared";
import AddCustomer from "../components/AddCustomer";
import useFetch from "../hooks/UseFetch";
export default function Customers() {
  // const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show)
  }

  const url = baseURL + "api/customers/";

  const { request, appendData, data: { customers } = {}, errorStatus } = useFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access')
    }
  }
  );

  useEffect(() => {
    // console.log("request:", request);
    // console.log("appendData:", appendData);
    console.log("customers:", customers);
    // console.log("errorStatus:", errorStatus);

  }, [request, appendData, customers, errorStatus]);

  useEffect(() => {
    request()

  }, []);





  
  function newCustomer(name, industry) {
    appendData({ name: name, industry: industry });
    if (!errorStatus) {
      toggleShow();
    }



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
