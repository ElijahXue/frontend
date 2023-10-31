import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export default function DefinitionSearch(){
  const [word, setWord] = useState("input"); 
  const navigate = useNavigate();
  return (
    <form
      className="flex justify-center space-x-2 max-x-[300px]"
      onSubmit={() => {
        navigate('/dictionary/' + word);
      }}>
      <input
        className="shrink min-w-0 px-2 rounded py-1"
        placeholder="Tuesday"
        type='text'
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button className="hover:bg-green-400 focus:shadow-outline focus:outline-none text-pink font-bold py-1 px-2 rounded">search
      </button>



    </form>


  )


  
}