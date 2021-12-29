import logo from './logo.svg';
import './App.css';
import axios from "axios"
import React, { useEffect,useState,useCallback } from 'react'

import {useDropzone} from 'react-dropzone'


const UserProfiles =({userProfiles,setUserProiles})=>{
  
  const fetchUserProfile=()=>{
    axios.get("http://localhost:8080/api/v1/user-profile").then(res=>{
       const sorted = res.data;
   
       sorted.sort((a,b)=>{
        return b.userProfileId - a.userProfileId
       })
       setUserProiles(sorted);

    })
   
  }

  useEffect(()=>{
    fetchUserProfile();
  },[]);
  
  //delete
  
  const handleDelete=(e)=>{
   
     axios.delete(`http://localhost:8080/api/v1/user-profile/delete/${e}`).then('user deleted').catch(err=>console.log(err))
     window.location.reload()
  }
  return userProfiles.map((userProfiles,index) =>{
    
    return(
      <div className="wholeProfile"
      key={index}>
        {/* todo profile image */}
        <div className="img-delete">
          {userProfiles.userProfileImageLink ? <img src={`http://localhost:8080/api/v1/user-profile/${userProfiles.userProfileId}/image/download`} alt='Drag new image below'></img>:<div className="upload">Upload a image below ~ </div>}
          <div className="trash"><i pi ={userProfiles.userProfileId} onClick={()=>handleDelete(userProfiles.userProfileId)} id="trashBin" class="fas fa-trash-alt fa-2x"></i></div>
        </div>
        
    
        <br/>
        <br/>
        <h1 className="name">{userProfiles.username}</h1>
        <p>User name</p>
        <Dropzone userProfileId={userProfiles.userProfileId}/>
         <br/>
      </div>
    )
  })
}



function Dropzone({userProfileId}) {
  // console.log(userProfileId)
  const onDrop = useCallback(acceptedFiles => {
    
       const file  = acceptedFiles[0];
       
       const formData = new FormData();
       formData.append("file",file);
        axios.get("http://localhost:8080/api/v1/user-profile").then(
          user=>{
            var id = user.data.pop().userProfileId
            axios.post(`http://localhost:8080/api/v1/user-profile/${id}/image/upload`,
       formData,{
         headers:{
           "Content-Type":"multipart/form-data"
         }
       }).then(()=>{console.log("file uploaded successfully");
      window.location.reload();}).catch(err=>console.log(err));
  }, [])
          }
        )
       
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="dragZone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the images here ...</p> :
          <p className="drag">Drag and Drop the images here ~ <i class="fas fa-camera-retro"></i></p>
      }
    </div>
  )
}
//add 
const Add=({userProfiles, setUserProiles})=>{
   const [name,setName] = useState("");
   
  const recordName = (e)=>{
    setName(e.target.value)
  }
  
  const handleName =(e)=>{
    // e.preventDefault()
    
     axios.get("http://localhost:8080/api/v1/user-profile").then(users=>{
       var  users = users.data
       var lastId = users.pop().userProfileId+1
       
       console.log("get last userId"+lastId)
      const user = {"userProfileId":"","username":name,"userProfileImageLink":null}
     axios.post('http://localhost:8080/api/v1/user-profile/add',user).then(console.log("successfully add new user")).catch(err=>console.log(err))
    setUserProiles([{userProfileId:lastId, username:name,userProfileImageLink:null},...userProfiles])
    setName('')
       
     })
    
   
    
   }
  
  return(
    <div className="input">
    <div class="input-group w-50 mb-3">
    <input value={name} onChange={recordName} type="text" class="form-control" placeholder="New username" aria-label="Recipient's username" aria-describedby="button-addon2" />
    <button onClick={handleName} class="btn btn-info" type="button" id="button-addon2">Add</button>
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
