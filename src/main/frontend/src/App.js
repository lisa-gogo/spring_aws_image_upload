import logo from './logo.svg';
import './App.css';
import axios from "axios"
import React, { useEffect,useState } from 'react'


const UserProfiles =()=>{
  
 const [userProfiles, setUserProiles] = useState([])
  const fetchUserProfile=()=>{
    axios.get("http://localhost:8080/api/v1/user-profile").then(res=>{
       setUserProiles(res.data);

    })
   
   
  }

  useEffect(()=>{
    fetchUserProfile();
  },[]);

  return userProfiles.map((userProfiles,index) =>{

    return(
      <div>
        <h1>{userProfiles.username}</h1>
        <p>{userProfiles.userProfileId}</p>
      </div>
    )
  })
}


function App() {
  return (
    <div className="App">
      <UserProfiles/>
    </div>
  );
}

export default App;
