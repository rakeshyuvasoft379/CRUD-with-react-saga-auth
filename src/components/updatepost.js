import React from 'react'
import { update_post } from '../redux/actions/actions'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

function Updatepost() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
   
    const {register,handleSubmit,formState:{errors}}=useForm()

    const onSubmit=(data)=>{
       
        dispatch(update_post(data,id))
        navigate(`/dashboard`)
      }

  return (
    <div>
        <h2>Update Post</h2>
       <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Update Post</h1>
            <label>Title</label> &nbsp;&nbsp;
            <input {...register('title',{required:true})}/>
            {errors.title && <p style={{color:"red"}}>title is required</p>}
            <br/><br/>
            <label>Description</label>&nbsp;&nbsp;
            <input type="text" {...register('description',{required:true})}/>
            {errors.description && <p style={{color:"red"}}>description is required</p>}
            <br/><br/>
            <input type="submit" value="update"/>
        </form> 
    </div>
  )
}

export default Updatepost