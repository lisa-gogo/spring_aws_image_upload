import React,{useCallback,useDropzone} from 'react';
import axios from 'axios';

function Dropzone({userProfileId,fetchUserProfile}) {
    // console.log(userProfileId)
    const onDrop =useCallback(acceptedFiles => {
      
         const file  = acceptedFiles[0];
         
         const formData = new FormData();
         formData.append("file",file);
          axios.get("https://lisa-first-po.herokuapp.com/api/v1/user-profile").then(
            user=>{
              var id = user.data.pop().userProfileId
            // id is its true id 
              axios.post(`https://lisa-first-po.herokuapp.com/api/v1/user-profile/${id}/image/upload`,
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

export default Dropzone;
