import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
import { useParams, Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";


export default function Definition() {
  


  console.log(useParams());
  let { search } = useParams();
  const navigate = useNavigate();
  // nesting destructing 
  const {data:[{meanings:word}] = [{}], errorStatus} = useFetch(
    'https://api.dictionaryapi.dev/api/v2/entries/en/' + search
  )

  
  useEffect(()=>{

    // console.log("word",data)
  })
 

  if (errorStatus === 404) {
    return (
      <>
        <NotFound />
      
        <Link to='/dictionary'> search another </Link>
      </>

    );
  }
  if (errorStatus) {
    return (
      <>
         <p> some thing went wrong, try again?</p>
        <Link to='/dictionary'> search another </Link>
      </>

    );
  }

  // return <p> work in progress </p>
  
  return (
    <>
      {word?(
        <>
         <h1>Here is a definition</h1>
          {word.map((meaning) => {
            return (
              
              <p key={v4()} >
                
                {meaning.partOfSpeech + ': '}
                {meaning.definitions[0].definition}
              </p>
            );
          }
          )}
           <h1>Search again</h1>
           <DefinitionSearch/>
        </>
        ): (<h1>Here is a definition</h1>)
      }
     
    </>
  );


}