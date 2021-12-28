import logo from './logo.svg';
import './App.css';
import axios from "axios"
import React, { useEffect,useState,useCallback } from 'react'

import {useDropzone} from 'react-dropzone'


const UserProfiles =({userProfiles,setUserProiles})=>{
  
  const fetchUserProfile=()=>{
    axios.get("http://localhost:8080/api/v1/user-profile").then(res=>{
       const sorted = res.data;
       console.log(sorted)
       sorted.sort((a,b)=>{
        return b.userProfileId - a.userProfileId
       })
       setUserProiles(sorted);

    })
   
  }

  useEffect(()=>{
    fetchUserProfile();
  },[]);

  return userProfiles.map((userProfiles,index) =>{

    return(
      <div key={index}>
        {/* todo profile image */}
        {userProfiles.userProfileId ? <img src={`http://localhost:8080/api/v1/user-profile/${userProfiles.userProfileId}/image/download`} alt='Drag new image below'></img>:<></>}
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
       }).then(()=>{console.log("file uploaded successfully");
      window.location.reload();}).catch(err=>console.log(err));
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
const Add=({userProfiles, setUserProiles})=>{
   const [name,setName] = useState("");
   var start =2;
  const recordName = (e)=>{
    setName(e.target.value)
  }
  
  const handleName =(e)=>{
    // e.preventDefault()
  
    
    var num = start+1;
    start = start +1
    const user = {"userProfileId":"","username":name,"userProfileImageLink":null}
    axios.post('http://localhost:8080/api/v1/user-profile/add',user).then(console.log("successfully add new user")).catch(err=>console.log(err))
    setUserProiles([{userProfileId:num, username:name,userProfileImageLink:null},...userProfiles])
   }
  
  return(
    <div className="input">
    <div class="input-group w-50 mb-3">
    <input value={name} onChange={recordName} type="text" class="form-control" placeholder="New username" aria-label="Recipient's username" aria-describedby="button-addon2" />
    <button onClick={handleName} class="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
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

// Profiles 

const Profiles =()=>{
  const [userProfiles, setUserProiles] = useState([])
  return(
    <>
     <Add userProfiles={userProfiles} setUserProiles={setUserProiles}/>
      <UserProfiles userProfiles={userProfiles} setUserProiles={setUserProiles} />
    </>
  )
}


function App() {
  return (
    <div className="App">
      <Title/>
      <Profiles/>
     
    </div>
  );
}

export default App;
