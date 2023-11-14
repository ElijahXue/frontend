
import { useState,useEffect } from "react";

export default function useFetch(url){
    const [data,setData] = useState();
    const [errorStatus,setErrorStatus] = useState();
    useEffect(()=>{
        fetch(url)
        .then((response)=>{
            if (!response.ok) {
                // setErrorStatus(response.status); // Set errorStatus to the HTTP status code in case of an error
                throw (response.status);
              }
            return response.json();
        })
        .then((data)=>{
            setData(data);
        }).catch((e)=>{
            // console.log("catch error",e)
            setErrorStatus(e);
        })

    },[]);
    return [data, errorStatus];
}