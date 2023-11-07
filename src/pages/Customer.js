import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";
export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState();
    const [notfound, setNotfound] = useState();
    const [error, setError] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log('setChanged', changed);
        // console.log('tmpcustomer', tempCustomer);
        // console.log('customer', customer);

    })
    useEffect(() => {
        if (!customer) return;
        if (!tempCustomer) return;
        let equal = true;
        if (customer.name !== tempCustomer.name || customer.industry !== tempCustomer.industry) {
            equal = false;
        }
        setChanged(!equal);
        // console.log("call compare", equal);
    }, [customer, tempCustomer]);

    useEffect(() => {
        // console.log("useEffect")
        const url = baseURL + 'api/customers/' + id
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    navigate('/404');
                    setNotfound(true);
                }
                if (!response.ok) {
                    throw new Error(' something went wrong')
                }


                return response.json()
            })
            .then((data) => {
                // console.log(data.customer.name)
                setCustomer(data.customer);
                setTempCustomer(data.customer);
                setError(undefined);
            })
            .catch((e) => {
                console.log("catch: " + e.message);
            })
    }, [])
    function deleteCustomer() {
        console.log('deleting..');
    }

    function updateCustomer() {
        const url = baseURL + 'api/customers/' + id;
        fetch(
            url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempCustomer)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            return response.json()
        }
        ).then((data) => {
            setChanged(false);
            setCustomer(data.customer);    // data.customer and ...tempCustomer they are all lists
            setError(undefined);
        }).catch((e) => {
            console.log(e);
            setError(e.message);
        });
    }
    return (
        <>
            {notfound ? <NotFound /> : null}
            {customer ? (
                <div>
                    <input
                        className='m-2 block px-2'
                        type='text'
                        value={tempCustomer.name}
                        onChange={(e) => {
                            setChanged(true);
                            setTempCustomer({
                                ...tempCustomer,
                                name: e.target.value
                            });
                        }}
                    />
                    <input
                        className='m-2 block px-2'
                        type='text'
                        value={tempCustomer.industry}
                        onChange={(e) => {
                            setChanged(true);
                            setTempCustomer({
                                ...tempCustomer,
                                industry: e.target.value
                            });
                            // compareCustomers();


                        }}
                    />
                    {changed ?
                        (
                            <>
                                <button c
                                    className='m-2 block px-2'
                                    onClick={updateCustomer}>
                                    Save
                                </button>
                                <button
                                    className='m-2 block px-2'
                                    onClick={(e) => {
                                        setTempCustomer({ ...customer });
                                        setChanged(false);
                                    }}>
                                    Cancel
                                </button>

                            </>
                        ) :
                        (<p>not Changed </p>)}


                    <button onClick={(e) => {
                        const url = baseURL + 'api/customers/' + id;
                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => {

                            if (!response.ok) {
                                throw new Error('Something went wrong');
                            }
                            setError(undefined);
                            navigate('/customers');
                        }).catch((e) => {
                            console.log(e);
                            setError(true);
                        })
                    }}>Delete
                    </button>

                </div>
            ) : null}
            {error ? (<p>{error}</p>) : null}
            <br />
            <Link to='/customers'>Go Back </Link>

        </>
    )
}