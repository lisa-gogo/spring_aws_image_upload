import React,{useState} from 'react';
import axios from 'axios';


const Like = (like,fetchUserProfile)=>{
    const [userLike,setUserLike] = useState(like.like)
   
    const id = like.id
    const handleLike= async(id)=>{
      console.log(id)
      setUserLike(!userLike)
      await axios.post(`https://lisa-first-po.herokuapp.com/api/v1/user-profile/likes/${id}`).then(()=>console.log('likes update successful'))
      .catch(err=>console.log(err))
    }
   return(
     
     <>
       <div onClick={()=>handleLike(id)} className="like">{userLike?(<i class="redheart fas fa-heart fa-2x"></i>):(<i class="far  fa-heart fa-2x"></i>)}</div>
     </>
   )
 }

export default Like;
