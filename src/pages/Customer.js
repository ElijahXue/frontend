import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import NotFound from "../components/NotFound";
import { useLocation } from "react-router-dom";
import { baseURL } from "../shared";
import { LoginContext } from "../App";

export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState();
    const [notfound, setNotfound] = useState();
    const [error, setError] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [loggedIn,setloggedIn] = useContext(LoginContext);
    const [changed, setChanged] = useState(false);
    const location = useLocation();
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
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
            .then((response) => {
                if (response.status === 404) {
                    navigate('/404');
                    setNotfound(true);
                } else if (response.status === 401) {
                    setloggedIn(false);
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        }
                    })
                }
                if (!response.ok) {
                    throw new Error(' something went wrong in customers fetch')
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
    }, [id, navigate, location.pathname])


    function updateCustomer(e) {
        e.preventDefault();
        const url = baseURL + 'api/customers/' + id;
        fetch(
            url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(tempCustomer)
        }).then((response) => {
            if (!response.ok) {
                // throw new Error('Something went wrong');
            } else if (response.status === 401) {
                setloggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname,
                    }
                })
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
        <div className="p-3">
            {notfound ? <NotFound /> : null}
            {customer ? (
                <div >
                    <form className="w-full max-w-sm" id='customer' onSubmit={updateCustomer}>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor='name'>Name</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="name"
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
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor="industry"> industry </label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id="industry"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type='text'
                                    value={tempCustomer.industry}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setTempCustomer({
                                            ...tempCustomer,
                                            industry: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>

                    </form >

                    {
                        changed ?
                            (
                                <div className="">
                                    <button
                                        form="customer"
                                        className="bg-purple-500 mr-2 hover:bg-purple-400 focus:outline-none text-white font-bold py-2 px-4 w-auto rounded "
                                    // onClick={updateCustomer}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className=" bg-purple-500 hover:bg-purple-400 focus:outline-none text-white font-bold py-2 px-3.5 w-auto rounded"
                                        onClick={(e) => {
                                            setTempCustomer({ ...customer });
                                            setChanged(false);
                                        }}>
                                        Cancel
                                    </button>

                                </div>
                            ) :
                            (<p>not Changed </p>)
                    }

                    <div>
                        <button
                            className=" bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => {
                                const url = baseURL + 'api/customers/' + id;
                                fetch(url, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('access')

                                    }
                                }).then((response) => {

                                    if (!response.ok) {
                                        // throw new Error('Something went wrong');
                                    } else if (response.status === 401) {
                                        setloggedIn(false);
                                        navigate('/login', {
                                            state: {
                                                previousUrl: location.pathname,
                                            }
                                        })
                                    }
                                    setError(undefined);
                                    navigate('/customers');
                                }).catch((e) => {
                                    console.log(e);
                                    setError(true);
                                })
                            }}>
                            Delete
                        </button>
                    </div>

                </div >
            ) : null}
            {error ? (<p>{error}</p>) : null}
            <br />
            <Link to='/customers'>
                <button className="no-underline bg-purple-600 text-white font-bold py-2 px-4 rounded">
                    {'\u2190'} Go Back ←
                </button>

            </Link>

        </div>
    )
}