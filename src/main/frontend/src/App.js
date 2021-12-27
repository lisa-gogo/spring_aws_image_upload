import logo from './logo.svg';
import './App.css';
import axios from "axios"
import React, { useEffect,useState,useCallback } from 'react'

import {useDropzone} from 'react-dropzone'

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
      <div key={index}>
        {/* todo profile image */}
        {userProfiles.userProfileId ? <img src={`http://localhost:8080/api/v1/user-profile/${userProfiles.userProfileId}/image/download`}></img>:<></>}
        <br/>
        <br/>
        <h1>{userProfiles.username}</h1>
        <p>{userProfiles.userProfileId}</p>
        <Dropzone userProfileId={userProfiles.userProfileId}/>
         <br/>
      </div>
    )
  })
}



function Dropzone({userProfileId}) {
  const onDrop = useCallback(acceptedFiles => {
    
       const file  = acceptedFiles[0];
       console.log(file)
       const formData = new FormData();
       formData.append("file",file);
       axios.post(`http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
  
       formData,{
         headers:{
           "Content-Type":"multipart/form-data"
         }
       }).then(()=>{console.log("file uploaded successfully")}).catch(err=>console.log(err));
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="dragZone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the images here ...</p> :
          <p className="drag">Drag and Drop the images here</p>
      }
    </div>
  )
}
//add 
const Add=()=>{
  return(
    <div className="input">
    <div class="input-group w-50 mb-3">
    <input type="text" class="form-control" placeholder="New username" aria-label="Recipient's username" aria-describedby="button-addon2" />
    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
   </div>
    </div>
  )
}
// Title 
const Title=()=>{
  return(
    <>
    <div className="title">
     Welcome !
    </div>
    <div className="des">You can add new user and drag a picture here.</div>
    </>
  )
}


function App() {
  return (
    <div className="App">
      <Title/>
      <Add/>
      <UserProfiles/>
    </div>
  );
}

export default App;
