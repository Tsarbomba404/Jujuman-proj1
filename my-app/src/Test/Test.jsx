/* import React, { useState } from 'react'
import { useEffect } from 'react';

const Test = () => {

  const[data,setData]=useState(null);
  const[error,setError]=useState(null)
  const[loading,setLoading]=useState(true)

const endpoint="https://jsonplaceholder.typicode.com/users"

useEffect(()=>

{
  const fetchData = async ()=>{
    try{
      const response = await fetch(endpoint)
    }
    if(!response.ok){
      catch new Error()
    }
  }
}

)

  return (
    <div>
      
    </div>
  )
}

export default Test
 */
