import { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { v4 } from 'uuid';
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";


export default function Definition() {

  console.log(useParams());
  let { search } = useParams();
  // nesting destructing
  const { request, data: [{ meanings: word }] = [{}], errorStatus } = useFetch(
    'https://api.dictionaryapi.dev/api/v2/entries/en/' + search
  )

  useEffect(() => {
    request();
    // console.log("word",data)
  }, [])


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


  return (
    <>
      {word ? (
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
          <DefinitionSearch />
        </>
      ) : (<h1>Here is a definition</h1>)
      }

    </>
  );


}