
import {
  GET_LOGIN_STARTED,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILURE,
  GET_LOGOUT_SUCCESS,
  GET_DATA_SUCCESS,
  Error,
  DELETE_DATA,
  ADD_DATA,
  UPDATE_DATA,
  SINGLE_DATA,

  
} from '../actions/types';


const initialState={
    user:[],
    error:"",
    post:[]
}

export const LoginReducer=(state=initialState,action)=>{

    switch(action.type){

     case GET_LOGIN_STARTED:
     
      return{
        ...state,
     
      } 
      
      case GET_LOGIN_SUCCESS:
       
        return{
            ...state,
        user:action.user
        }

        case GET_LOGIN_FAILURE:
       
        return{
            ...state,
            error:action.error
        }
    
      case GET_LOGOUT_SUCCESS:
        return{
          ...state,
          user:null,
          error:null
        }  

        case GET_DATA_SUCCESS:
       
          return{
            ...state,
            user:action.payload
          }

          case DELETE_DATA:
            return{
              ...state,
              user:action.payload
            }

            case ADD_DATA:
       
              return{
                ...state,
                user:action.payload
              }

              case UPDATE_DATA:
        
              return{
                ...state,
                user:action.payload
              }

              case SINGLE_DATA:
        
              return{
                ...state,
                post:action.payload
              }

            
        case Error:
          return{
            ...state,
            error:action.payload
          }      

      default:
        return state

    }

}