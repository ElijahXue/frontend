import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";
export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState();
    const [notfound, setNotfound] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        console.log("useEffect")
        const url = baseURL + 'api/customers/' + id
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    //redirect to a 404 new URL
                    navigate('/404');
                    // render a 404 component in this pate 
                    setNotfound(true);

                }
                return response.json()
            })
            .then((data) => {
                // console.log(data.customer.name)
                setCustomer(data.customer)
            })
            .catch((e) => {

                console.log("catch: " + e.message);
            })
    }, [])
    function deleteCustomer() {
        console.log('deleting..');
    }
    return (
        <>
            {notfound ? <NotFound /> : null}
            {customer ? (
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
            ) : (<p> </p>)}

            <button onClick={deleteCustomer}>Delete</button>
            <br />
            <Link to='/customers'>Go Back </Link>

        </>
    )
}