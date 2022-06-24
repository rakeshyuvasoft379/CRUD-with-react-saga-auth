import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLogin } from '../redux/actions/actions'



function Login() {
    
    const user=useSelector(state=>state.user)
   
    const {register,handleSubmit,formState:{errors}}= useForm()
    
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const onSubmit=(data)=>{
  
     dispatch(getLogin(data))
    
    }

    useEffect(()=>{
      console.log("useEffect",user)
        if(user?.user && user?.user.length!=0)
        {
           navigate('/dashboard')
        }
    },[user?.user])

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
         <h2>Email</h2>
         <input {...register('email',{required:true})}/>
         {errors.email && <p>email is required</p>}
         <h2>Password</h2>
         <input {...register('password',{required:true})}/>
         {errors.password && <p>password is required</p>}
         <br/><br/>
         <input type="submit"/>
        </form>
    </div>
  )
}

export default Login