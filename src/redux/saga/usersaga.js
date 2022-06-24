import {call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILURE,
    GET_LOGIN_REQUESTED,
    GET_LOGOUT_REQUESTED,
    GET_LOGOUT_SUCCESS,
    GET_DATA,
    GET_DATA_SUCCESS,
    Error,
    DELETE_POST,
    DELETE_DATA,
    
    ADD_DATA,
    ADD_POST,
    UPDATE_DATA,
    UPDATE_POST,
    SINGLE_POST,
    SINGLE_DATA,

  } from '../actions/types';

function getApi(data){
   const body={
    "user":{
        "email":data.email,
        "password":data.password
    }
   }

   return axios.request({
    method:"post",
    url:`https://react-rails-api-demo.herokuapp.com/api/v1/signin`,
    data:body
   })
}

const showData=()=>{
    const token=localStorage.getItem('token')
    return axios.get("https://react-rails-api-demo.herokuapp.com/api/v1/posts",{headers: {Authorization: `${token}`}})
   }

const deleteData=(id)=>{  
    console.log("deleteData")
    const token=localStorage.getItem('token')
  
    return axios.delete(`https://react-rails-api-demo.herokuapp.com/api/v1/posts/${id}`,{headers: {Authorization: `${token}`}})
    
}   

const addData=(data)=>{

      const token=localStorage.getItem('token')
    const userid=localStorage.getItem('user_id')
  
    const body ={
        "post": 
        {
            "title": data.title,
            "description": data.description,
            "user_id": userid
        }
    }
   return axios.post(`https://react-rails-api-demo.herokuapp.com/api/v1/posts`,body,{headers: {Authorization: `${token}`}})
}

const updateData=(data,id)=>{
  
    const token=localStorage.getItem('token')
  const userid=localStorage.getItem('user_id')

    const body ={
        "post": 
        {
            "title": data.title,
            "description": data.description,
            "user_id": userid
        }
    }
   return axios.put(`https://react-rails-api-demo.herokuapp.com/api/v1/posts/${id}`,body,{headers: {Authorization: `${token}`}})
}

const singleData=(id)=>{

    const token=localStorage.getItem('token')
   
 
   
   return axios.get(`https://react-rails-api-demo.herokuapp.com/api/v1/posts/${id}`,{headers: {Authorization: `${token}`}})
}


function* fetchData(action){
    try{
        const response = yield call(showData, action.payload)
               yield put({
            type:GET_DATA_SUCCESS,
            payload:response.data
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}


function* fetchUser(action){
    try{
       
        const response=yield call(getApi, action.payload)
        
        localStorage.setItem('user-info',JSON.stringify(response.data))
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('user_id',response.data.user.id)

        yield put({type:GET_LOGIN_SUCCESS,user:response.data})
 
    } catch(e){
        yield put({type:GET_LOGIN_FAILURE,message:e.message})
    }
}

function* logoutUser(action){
 try{
    yield put({type:GET_LOGOUT_SUCCESS})
 }catch(e){
    yield put({type:GET_LOGIN_FAILURE,error:e.message})
 }

}

function* deleteUser(action){
    try{
        const response = yield call(deleteData, action.payload)
            yield put({
            type:DELETE_DATA         
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}

function* addUser(action){
   
    try{
        let response = yield call(addData, action.payload)
    
            yield put({
            type:ADD_DATA,
            payload: response.data    
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}

function* updateUser(action){
        try{
        let response = yield call(updateData, action.payload,action.id)
 
            yield put({
            type:UPDATE_DATA,
            payload: response.data    
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}

function* singleUser(action){
     try{
        let response = yield call(singleData, action.payload)
       
            yield put({
            type:SINGLE_DATA,
            payload: response.data    
        })
    }
    catch(e){
        yield put({type:Error, payload : e.message})
    }
}

function* userSaga(){
    yield takeEvery(GET_LOGIN_REQUESTED, fetchUser)
    yield takeEvery(GET_LOGOUT_REQUESTED, logoutUser)
    yield takeEvery(GET_DATA, fetchData)
    yield takeEvery(DELETE_POST,deleteUser)
    yield takeEvery(ADD_POST,addUser)
    yield takeEvery(UPDATE_POST,updateUser)
    yield takeEvery(SINGLE_POST,singleUser)
}

export default userSaga
