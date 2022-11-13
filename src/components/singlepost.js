import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

function Singlepost() {

    const object=useSelector(state=>state.user.post)
   
   useEffect(()=>{
    
   },[object])

    //my first commit

  return (
    <div>
        <h2>View</h2>
       
        <h3>{object.post?.title}</h3>
        <h3>{object.post?.description}</h3>
    </div>
  )
}

export default Singlepost
