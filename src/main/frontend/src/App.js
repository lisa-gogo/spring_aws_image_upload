
import './App.css';
import axios from "axios"
import React, { useEffect,useState,useCallback } from 'react'
import Like from './components/Like';
import Comment from './components/Comment';
import Add from './components/Add';
import {BrowserRouter, Link, Route,Routes} from "react-router-dom"

import {useDropzone} from 'react-dropzone'
import Myfavoriate from './components/Myfavoriate';


const UserProfiles =({userProfiles,setUserProiles})=>{
  
  const fetchUserProfile= async ()=>{ 
   await axios.get("http://localhost:8080/api/v1/user-profile").then(res=>{
       const sorted = res.data;
   
       sorted.sort((a,b)=>{
        return b.userProfileId - a.userProfileId
       })
       setUserProiles(sorted);

    })
   
  }

  useEffect(()=>{
    fetchUserProfile();
  },[]);// I must have this [].Otherwise, it calls all the time. 
  
  //delete
  
  const handleDelete= async(e)=>{
   
     await axios.delete(`http://localhost:8080/api/v1/user-profile/delete/${e}`).then('user deleted').catch(err=>console.log(err))
     fetchUserProfile()
  }

  return (
    <div className='container'>
    {userProfiles.map((userProfiles,index) =>{

      var comment = userProfiles.comment
      var like = userProfiles.userLikes
      var   id = userProfiles.userProfileId
       
  
    return(
      <div className="wholeProfile"
      key={index}>
        {/* todo profile image */}
        <div className="img-delete">
          <div className='left'>
              {userProfiles.userProfileImageLink ? <img src={`http://localhost:8080/api/v1/user-profile/${userProfiles.userProfileId}/image/download`} alt='Drag new below'></img>:<div className="upload"><p className='uw'>Upload a image below ~</p> </div>}
              <Comment comment={comment} fetchUserProfile={fetchUserProfile} id={userProfiles.userProfileId}/>
              
             
          </div>
          <div className='right'>
                <div className="trash"><i pi ={userProfiles.userProfileId} onClick={()=>handleDelete(userProfiles.userProfileId)} id="trashBin" class="fas fa-trash-alt fa-2x"></i></div>
                <Like like={like} fetchUserProfile={fetchUserProfile} id={id}/>
                
               
          </div>
        </div>
        <h1 className="name">{userProfiles.username}</h1>
        <p>date:{userProfiles.addDate}</p>
        <Dropzone userProfileId={userProfiles.userProfileId} fetchUserProfile={fetchUserProfile}/>
         <br/>
      </div>
    )
  })}</div>)
}



function Dropzone({userProfileId,fetchUserProfile}) {
  // console.log(userProfileId)
  const onDrop =useCallback(acceptedFiles => {
    
       const file  = acceptedFiles[0];
       
       const formData = new FormData();
       formData.append("file",file);
        axios.get("http://localhost:8080/api/v1/user-profile").then(
          user=>{
            var id = user.data.pop().userProfileId
          // id is its true id 
            axios.post(`http://localhost:8080/api/v1/user-profile/${id}/image/upload`,
       formData,{
         headers:{
           "Content-Type":"multipart/form-data"
         }
       }).then(()=>{console.log("file uploaded successfully");
      fetchUserProfile();}).catch(err=>console.log(err));
  }, [])
          },[]
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
//-------------------add new user 

//---------add new user end -----------------
// Title 
const Title=()=>{
  return(
    <>
    <div className="title"> 
        <div className='happyFace'><i class="far fa-smile-wink"></i></div>
        <Link to={"/"} className="kitchen"> Kitchen !</Link>
        <Link to={"/likes"} className="favoriatePage"> <i class="fab fa-gratipay"></i>Likes</Link>
        
        
    </div>
    <div className="des">Add new dishes and drag its picture here.</div>
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
      <BrowserRouter>
      <Title/>
      <Routes>
        <Route path='/' element={<Profiles/>}/>
        <Route path='/likes' element={<Myfavoriate/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
