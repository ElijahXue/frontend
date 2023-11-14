
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
export default function useFetch(url, { method, headers, body } = {}) {
    const [data, setData] = useState();
    const [errorStatus, setErrorStatus] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    function request() {
        fetch(url, {
            method: method,
            headers: headers,
            body: body,
        })
            .then((response) => {
                if (response.status === 401) {
                    // setloggedIn(false);
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        }
                    })
                }
                if (!response.ok) {
                    // setErrorStatus(response.status); // Set errorStatus to the HTTP status code in case of an error
                    throw (response.status);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            }).catch((e) => {
                // console.log("catch error",e)
                setErrorStatus(e);
            })

    }

    function appendData(newData) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newData)
        })
            .then((response) => {
                if (response.status === 401) {
                    // setloggedIn(false);
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        }
                    })
                }

                if (!response.ok) {
                    throw response.status;
                }

                return response.json();
            }
            ).then((d) => {
                const submitted = Object.values(d)[0];
                console.log('submitted', submitted);
                const newState = {...data};
                console.log('newState', newState);
                Object.values(newState)[0].push(submitted);
                setData(newState)


                // codes below are also useable 

                // const submitted = Object.values(d)[0];
                // const newState = { ...data };
                // console.log('  newState[Object.keys(data)[0]] ',   newState[Object.keys(data)[0]] )
                // console.log('  [Object.keys(data)[0]] ',   Object.keys(data)[0])
                // newState[Object.keys(data)[0]] = [...newState[Object.keys(data)[0]], submitted];
                // setData(newState);

           

                // toggleShow();
                
            }).catch(error => setErrorStatus(error));

    }
    return { request, appendData, data, errorStatus };
}