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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the images here ...</p> :
          <p>Drag 'n' drop profile images, or click to select profile or images</p>
      }
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <UserProfiles/>
    </div>
  );
}

export default App;
