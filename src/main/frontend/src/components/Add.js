import React,{useState} from 'react';
import axios from 'axios';

const Add=({userProfiles, setUserProiles})=>{
    const [name,setName] = useState("");
    
    const recordName = (e)=>{
      setName(e.target.value)
    }
    
    const handleName = async(e)=>{ 
      e.preventDefault()
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1);
        
      const user = {"userProfileId":"","username":name,"userProfileImageLink":null,"comment":"no comment yet","userLikes":false,"addDate": date }
      axios.post("https://lisa-first-po.herokuapp.com/api/v1/user-profile/add",user).then(console.log("successfully add new user")).catch(err=>console.log(err))
     
     await axios.get("https://lisa-first-po.herokuapp.com/api/v1/user-profile").then(res=>{
     const sorted = res.data;
     console.log('get data')
      
     sorted.sort((a,b)=>{
      return b.userProfileId - a.userProfileId
     })
     setUserProiles(sorted);
    
     
  })
      setName('')
      window.location.reload();
      // }) 
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

export default Add;
