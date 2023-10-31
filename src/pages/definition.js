import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
import { useParams, Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
export default function Definition() {
  const [word, setWord] = useState([]);
  const [notfound, setNotfound] = useState(false);
  const [error, setError] = useState(false);


  console.log(useParams());
  let { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // const url = 'https://httpstat.us/504'
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search
    fetch(url)
      .then((response) => {
        console.log(response.status)
        console.log('response.ok: '+response.ok)
        if (response.status === 404) {
          setNotfound(true);
        }

        if (!response.ok){
          setError(true);
          throw new Error('Something went wrong');
        }

        return response.json()
      })
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0 && data[0].meanings) {
          setWord(data[0].meanings);
        } else {
          setWord(null);
          console.error("Received data is undefined or has an unexpected structure:", data);
          // Handle the error or unexpected data structure here
        }
      }
      ).catch((e)=>{

        console.log("catch: " + e.message);
      });
  }, []);

  if (notfound === true) {
    return (
      <>
        <NotFound />
      
        <Link to='/dictionary'> search another </Link>
      </>

    );
  }
  if (error === true) {
    return (
      <>
         <p> some thing went wrong, try again?</p>
        <Link to='/dictionary'> search another </Link>
      </>

    );
  }

  
  return (
    <>
      {word ?(
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