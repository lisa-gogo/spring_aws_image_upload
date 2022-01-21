import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Comment from './Comment';
import Like from './Like';

const Myfavoriate = () => {

  const [like,setLikes] = useState([])

  const fetchUserProfile= async ()=>{ 
    await axios.get("https://lisa-first-po.herokuapp.com/api/v1/user-profile/allLikes").then(res=>{  
        const sorted = res.data;
        sorted.sort((a,b)=>{
         return b.userProfileId - a.userProfileId
        })
        setLikes(sorted);
     })
   }
 
   useEffect(()=>{
     fetchUserProfile();
   },[]);// I must have this [].Otherwise, it calls all the time. 

     const handleDelete= async(e)=>{
   
     await axios.delete(`https://lisa-first-po.herokuapp.com/api/v1/user-profile/delete/${e}`).then('user deleted').catch(err=>console.log(err))
     fetchUserProfile()
  }
 
  return (
       <div className='container'> 

         {like.map((userProfiles,index)=>{
          
           var comment = userProfiles.comment
      var like = userProfiles.userLikes
      var   id = userProfiles.userProfileId

           return(
            <div className="wholeProfile"
            key={index}>
              {/* todo profile image */}
              <div className="img-delete">
                <div className='left'>
                    {userProfiles.userProfileImageLink ? <img src={`https://lisa-first-po.herokuapp.com/api/v1/user-profile/${userProfiles.userProfileId}/image/download`} alt='Drag new below'></img>:<div className="upload"><p className='uw'>Upload a image below ~</p> </div>}
                    <Comment comment={comment} fetchUserProfile={fetchUserProfile} id={userProfiles.userProfileId}/>
                    
                   
                </div>
                <div className='right'>
                      <div className="trash"><i pi ={userProfiles.userProfileId} onClick={()=>handleDelete(userProfiles.userProfileId)} id="trashBin" class="fas fa-trash-alt fa-2x"></i></div>
                      <Like like={like} fetchUserProfile={fetchUserProfile} id={id}/>
                      
                     
                </div>
              </div>
              <h1 className="name">{userProfiles.username}</h1>
              <p>date:{userProfiles.addDate}</p>
               <br/>
            </div>
           )
         })}  
       </div>
       
      
  );
};

export default Myfavoriate;
