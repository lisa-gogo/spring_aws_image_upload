import React ,{useState} from 'react';
import axios from 'axios';

const Comment =({comment,fetchUserProfile,id})=>{
    const [change,setChange] = useState(false)
    console.log('again')
    const commentChange=()=>{
      console.log('ok')
         setChange(true)
      }
     const [input, setInput] = useState('')

    const contentChange =e=>{
      setInput(e.target.value)
    }
     const handleComment =async(id)=>{
    console.log(input)
    await axios.post(`https://lisa-first-po.herokuapp.com/api/v1/user-profile/comments/${id}/${input}`).then(()=>
    console.log("comment uploaded successfully")).catch(err=>console.log(err))
 
 
   fetchUserProfile()
}

  return(<div className="addComment">
    
    { change?(<div><input value={input} onChange={contentChange}></input><button onClick={()=>handleComment(id)}>Add</button></div>):(<div className="commentWords"><i class="far fa-comments fa-2x"></i> : {comment}</div>)}
    <div className="comment"><i onClick={commentChange} class="fas fa-comment-medical fa-2x"></i></div>
  </div>)
}

export default Comment;
